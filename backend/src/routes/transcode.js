import fs from "node:fs";
import path from "node:path";
import {app_config} from "../app_config.js";


export default {
    setup: function (fastify) {
        fastify.post("/v1/transcode/upload", async (req, res) => {
            const transcodingDir = path.join(app_config.musicLibraryDir, "_transcoding")
            if(!fs.existsSync(transcodingDir)) {
                fs.mkdirSync(transcodingDir, {recursive: true})
            }

            const parts = req.files()
            for await (const part of parts) {
                if(part.file) {
                    const outFilePath = path.join(transcodingDir, part.filename)
                    const outFileStream = fs.createWriteStream(outFilePath)
                    const streamPromise = new Promise((resolve, reject) => {
                        part.file.on("end", resolve)
                        part.file.on("error", reject)
                    })
                    part.file.pipe(outFileStream)
                    await streamPromise
                } else {
                    console.log(part)
                }
            }
            res.code(200)
        })
    },
}
