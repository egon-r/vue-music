import Fastify from "fastify";
import FastifyStatic from "@fastify/static";
import FastifyCORS from "@fastify/cors";
import FastifyMultipart from "@fastify/multipart";
import FastifyWebsocket from "@fastify/websocket";
import {app_config} from "./app_config.js";
import {mongoose} from "mongoose";
import transcode from "./routes/transcode.js";
import url from "url";
import {TranscodeService} from "./background/transcode_service.js";
import thumbnails from "./routes/thumbnails.js";
import songs from "./routes/songs.js";


async function main() {
  await setupMongoose();
  const fastify = setupFastify();
  setupRoutes(fastify);

  TranscodeService.watchDirectory(app_config.transcodingDir);
  TranscodeService.start();

  // await SongModel.collection.drop()

  fastify.get("/", async (req, res) => {
    res.send(200);
  });

  fastify.listen({port: 3000, host: "0.0.0.0"}, (err, addr) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  });
  console.log("Server ready!");
  console.log("Data dir:" + app_config.dataDirPath)
}

process.on("SIGINT", () => {
  console.info("SIGINT, exiting...");
  process.exit(0);
});

await main();


function setupFastify() {
  const fastify = Fastify({
    // logger: true
  });

  console.log(app_config.dataDirPath)
  fastify.register(FastifyCORS, {});
  fastify.register(FastifyStatic, {
    root: app_config.musicLibraryDir,
    prefix: "/stream/",
  });
  fastify.register(FastifyMultipart, {});
  fastify.register(FastifyWebsocket, {});

  return fastify;
}

function setupRoutes(fastify) {
  songs.setup(fastify);
  thumbnails.setup(fastify);
  transcode.setup(fastify);
}

async function setupMongoose() {
  mongoose.set("strictQuery", false);
  // await mongoose.connect("mongodb://root:password@mongo:27017/");
  await mongoose.connect("mongodb://root:password@localhost:27017/");
}
