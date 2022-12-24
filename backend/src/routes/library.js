import {SongModel} from '../models.js';
import {app_config} from '../app_config.js';
import * as path from 'path';

export default {
  setup: function(fastify) {
    fastify.get('/v1/library', async (req, res) => {
      res.send(await SongModel.find());
    });

    fastify.get('/v1/library/delete:hash', async (req, res) => {
      const playlistFilePath = path.join(app_config.musicLibraryDir, req.query.hash + '.m3u8');
      try {
        console.log('deleting \'' + playlistFilePath + '\' ...');
        fs.rmSync(playlistFilePath);
      } catch (e) {
        console.error(e);
      }

      let segment = 0;
      let segmentFilePath = path.join(app_config.musicLibraryDir, req.query.hash + '_' + segment + '.ts');
      do {
        try {
          console.log('deleting \'' + segmentFilePath + '\' ...');
          fs.rmSync(segmentFilePath);
        } catch (e) {
          console.error(e);
        }
        segment++;
        segmentFilePath = path.join(app_config.musicLibraryDir, req.query.hash + '_' + segment + '.ts');
      } while (fs.existsSync(segmentFilePath));

      SongModel.collection.deleteOne({
        sha1: req.query.hash,
      });
      res.code(200);
    });
  },
};
