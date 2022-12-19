import * as fs from "node:fs"
import {exec} from "node:child_process"
import * as path from "node:path"
import {app_config} from "./app_config.js";

/**
 * @param mp3file full path to .mp3 file
 * @param outFileName name of the resulting m3u8/.ts file
 * @returns {Promise<void>}
 */
export async function transcode_mp3_to_m3u8(mp3file, outFileName) {
    if(!fs.existsSync(mp3file)) {
        console.warn("File '" + mp3file + "' doesn't exist!")
        return
    }

    const m3u8File = path.join(app_config.musicLibraryStreamingPath, outFileName + ".m3u8")
    const segmentsPath = path.join(app_config.musicLibraryStreamingPath, outFileName + "_%d.ts") // ffmpeg replaces %d

    const ffmpegTranscodeCmd = `ffmpeg -i ${mp3file}` +
        ` -vn -ac 2 -acodec aac -f segment -segment_format mpegts -segment_time 5` +
        ` -segment_list ${m3u8File} ${segmentsPath}`

    const exec_proc = exec(ffmpegTranscodeCmd, (err, stdout, stderr) => {
        if(err) {
            console.error(stderr)
        }
        console.log(stdout)
    })
    await new Promise((resolve) => {
        exec_proc.on("close", resolve)
    })
}