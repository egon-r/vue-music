import Fastify from "fastify"
import FastifyStatic from "@fastify/static"
import FastifyCORS from "@fastify/cors"
import FastifyMultipart from "@fastify/multipart"
import {app_config} from "./app_config.js";
import {mongoose} from "mongoose"
import library from "./routes/library.js";
import transcode from "./routes/transcode.js";
import {TranscodeService} from "./background/transcode_service.js";
import {SongModel} from "./models.js";


async function main() {
    await setupMongoose()
    const fastify = setupFastify()
    setupRoutes(fastify)

    TranscodeService.watchDirectory(app_config.transcodingDir)
    TranscodeService.start()
    TranscodeService.start()

    //await SongModel.collection.drop()

    fastify.get("/", async (req, res) => {
        res.send(200)
    })

    fastify.listen({port: 3000, host: "0.0.0.0"}, (err, addr) => {
        if (err) {
            fastify.log.error(err)
            process.exit(1)
        }
    })
}
await main()


function setupFastify() {
    const fastify = Fastify({
        //logger: true
    })

    fastify.register(FastifyCORS, {})
    fastify.register(FastifyMultipart, {})
    fastify.register(FastifyStatic, {
        root: app_config.musicLibraryDir,
        prefix: "/stream/"
    })

    return fastify
}

function setupRoutes(fastify) {
    library.setup(fastify)
    transcode.setup(fastify)
}

async function setupMongoose() {
    mongoose.set('strictQuery', false)
    await mongoose.connect("mongodb://root:password@mongo:27017/")
}
