import fs from 'node:fs';
import path from 'node:path';
import {app_config} from '../app_config.js';


const ws_clients = [];

export default {
  ws_clients: ws_clients,
  setup: function(fastify) {
    fastify.post('/v1/transcode/upload', async (req, res) => {
      const transcodingDir = path.join(app_config.transcodingDir);
      if (!fs.existsSync(transcodingDir)) {
        fs.mkdirSync(transcodingDir, {recursive: true});
      }

      const parts = req.files();
      for await (const part of parts) {
        if (part.file) {
          const outFilePath = path.join(transcodingDir, part.filename);
          const outFileStream = fs.createWriteStream(outFilePath);
          const streamPromise = new Promise((resolve, reject) => {
            part.file.on('end', resolve);
            part.file.on('error', reject);
            outFileStream.on('error', reject);
          });
          part.file.pipe(outFileStream);
          await streamPromise;
        } else {
          console.log(part);
        }
      }
      res.code(200);
    });

    fastify.register(async function(fastify) {
      fastify.get('/v1/transcode/status/ws', {websocket: true}, (connection, req) => {
        ws_clients.push(connection.socket);
        console.log('ws_clients: ', ws_clients.length);
        connection.socket.on('close', () => {
          ws_clients.splice(ws_clients.indexOf(connection.socket), 1);
          console.log('ws_clients: ', ws_clients.length);
        });
      });
    });
  },
};
