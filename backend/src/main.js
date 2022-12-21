import Fastify from "fastify"
import FastifyStatic from "@fastify/static"
import FastifyCORS from "@fastify/cors"
import FastifyMultipart from "@fastify/multipart"
import {transcode_mp3_to_m3u8} from "./transcoder.js";
import {app_config} from "./app_config.js";
import * as path from "node:path"
import {mongoose} from "mongoose"
import * as MusicMetadata from "music-metadata"
import {SongModel} from "./models.js";
import * as fs from "fs";
import * as crypto from "crypto";
import {sleep} from "./util/utils.js";



mongoose.set('strictQuery', false)
await mongoose.connect("mongodb://root:password@mongo:27017/")

const fastify = Fastify({
    logger: true
})

fastify.register(FastifyCORS, {})
fastify.register(FastifyMultipart, {})
fastify.register(FastifyStatic, {
    root: app_config.musicLibraryStreamingPath,
    prefix: "/stream/"
})

fastify.get("/", async (req, res) => {
    res.send(200)
})

fastify.get("/v1/library", async (req, res) => {
    res.send(await SongModel.find())
})

fastify.get("/v1/library/delete:hash", async (req, res) => {
    let playlistFilePath = path.join(app_config.musicLibraryStreamingPath, req.query.hash + ".m3u8")
    try {
        console.log("deleting '" + playlistFilePath + "' ...")
        fs.rmSync(playlistFilePath)
    } catch (e) {
        console.error(e)
    }

    let segment = 0
    let segmentFilePath = path.join(app_config.musicLibraryStreamingPath, req.query.hash + "_" + segment + ".ts")
    do {
        try {
            console.log("deleting '" + segmentFilePath + "' ...")
            fs.rmSync(segmentFilePath)
        } catch (e) {
            console.error(e)
        }
        segment++
        segmentFilePath = path.join(app_config.musicLibraryStreamingPath, req.query.hash + "_" + segment + ".ts")
    } while(fs.existsSync(segmentFilePath))

    SongModel.collection.deleteOne({
        sha1: req.query.hash
    })

    res.status(200)
})

fastify.post("/v1/library/add", async (req, res) => {
    const files = await req.saveRequestFiles()

    for (const file of files) {
        const origFilename = file.filename
        const tmpFilepath = file.filepath

        const metadata = await MusicMetadata.parseFile(tmpFilepath)
        let title = metadata.common.title ?? origFilename
        let artist = metadata.common.artist ?? origFilename
        let album = metadata.common.album ?? origFilename
        let year = metadata.common.year ?? 0

        const tmpStream = fs.createReadStream(tmpFilepath)
        const hasher = crypto.createHash("sha1")
        hasher.setEncoding("hex")
        const hasherEnd = new Promise((resolve, reject) => {
            tmpStream.on("end", () => {
                hasher.end()
                resolve(hasher.read())
            })
            tmpStream.on("error", reject)
        })
        tmpStream.pipe(hasher)
        const hash = await hasherEnd

        const song = SongModel({
            title: title,
            artist: artist,
            album: album,
            year: year,
            sha1: hash,
        })

        if (await SongModel.exists({sha1: hash})) {
            console.log("song '" + title + "' already in database!")
            await sleep(1000)
        } else {
            console.log("transcoding '" + title + "' ...")
            await transcode_mp3_to_m3u8(tmpFilepath, hash)
            console.log("saving '" + title + "' to database ...")
            await song.save()
            console.log(song)
        }
    }

    res.status(200)
})

fastify.listen({port: 3000, host: "0.0.0.0"}, (err, addr) => {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})