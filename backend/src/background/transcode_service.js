import fs from 'node:fs';
import chokidar from 'chokidar';
import {sleep} from '../util/utils.js';
import path from 'node:path';
import {app_config} from '../app_config.js';
import * as MusicMetadata from 'music-metadata';
import {SongModel} from '../models.js';
import * as crypto from 'crypto';
import {spawn} from 'child_process';
import transcode from '../routes/transcode.js';


const transcodeQueue = new Set();
let isRunning = false;

export const TranscodeService = {
  watchDirectory(dir) {
    console.log('watching: ' + dir);
    const watcher = chokidar.watch(dir, {
      persistent: true,
      usePolling: true,
      interval: 1000,
    });
    watcher.on('add', fileAdded);
    watcher.on('unlink', fileRemoved);
  },

  async start() {
    if (!isRunning) {
      isRunning = true;
    } else {
      console.log('TranscodeService is already running!');
      return;
    }

    while (isRunning) {
      if (transcodeQueue.size > 0) {
        const [currentFile] = transcodeQueue;
        console.log('processing \'' + currentFile + '\' ...');
        try {
          this.notifyWebsocketClients();
          const song = await this.extract_metadata(currentFile);
          if (await SongModel.exists({sha1: song.sha1})) {
            console.log('song \'' + song.title + '\' already in database! overwriting...');
            await SongModel.collection.deleteOne({sha1: song.sha1});
          }
          await this.transcode_mp3_to_m3u8(currentFile, song.sha1);
          await song.save();
          console.log('Added \'' + song.title + '\' to database!');
        } catch (e) {
          console.error(e);
          await sleep(2000);
        } finally {
          fs.rmSync(currentFile);
          transcodeQueue.delete(currentFile);
          this.notifyWebsocketClients();
        }
      } else {
        await sleep(2000);
      }
    }
  },

  stop() {
    isRunning = false;
  },

  notifyWebsocketClients() {
    transcode.ws_clients.forEach((client) => {
      client.send(
          JSON.stringify({
            queue_size: transcodeQueue.size,
          }),
      );
    });
  },

  extract_metadata: async function(filePath) {
    const origFilename = path.basename(filePath);
    const metadata = await MusicMetadata.parseFile(filePath);
    const title = metadata.common.title ?? origFilename;
    const artist = metadata.common.artist ?? origFilename;
    const album = metadata.common.album ?? origFilename;
    const year = metadata.common.year ?? 0;

    const tmpStream = fs.createReadStream(filePath);
    const hasher = crypto.createHash('sha1');
    hasher.setEncoding('hex');
    const hasherEnd = new Promise((resolve, reject) => {
      tmpStream.on('end', () => {
        hasher.end();
        resolve(hasher.read());
      });
      tmpStream.on('error', reject);
    });
    tmpStream.pipe(hasher);
    const hash = await hasherEnd;

    return SongModel({
      title: title,
      artist: artist,
      album: album,
      year: year,
      duration: metadata.format.duration,
      sha1: hash,
    });
  },

  /**
     * Transcodes a file to a HLS streamable format
     * @param inFilePath full path to input file
     * @param outFileName name of the resulting m3u8/.ts file
     * @return {Promise<void>}
     */
  transcode_mp3_to_m3u8: async function(inFilePath, outFileName) {
    if (!fs.existsSync(inFilePath)) {
      console.warn('File \'' + inFilePath + '\' doesn\'t exist!');
      return;
    }

    const m3u8File = path.join(app_config.musicLibraryDir, outFileName + '.m3u8');
    const segmentsPath = path.join(app_config.musicLibraryDir, outFileName + '_%d.ts'); // ffmpeg replaces %d

    const ffmpegProc = spawn('ffmpeg', [
      '-i', inFilePath, '-vn', '-ac', '2', '-acodec', 'aac',
      '-f', 'segment', '-segment_format', 'mpegts', '-segment_time', '5',
      '-segment_list', m3u8File, segmentsPath,
    ]);

    /*
        ffmpegProc.stderr.on("data", (data) => {
            process.stderr.write("ffmpeg (stderr): " + data)
        })
     */
    await new Promise((resolve) => {
      ffmpegProc.on('close', resolve);
    });
  },
};

function fileAdded(path) {
  transcodeQueue.add(path);
}

function fileRemoved(path) {
  transcodeQueue.delete(path);
}
