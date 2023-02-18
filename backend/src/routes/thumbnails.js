import {sha1FromStream} from "../util/utils.js";
import * as stream from "stream";
import {ThumbnailModel} from "../models.js";

export default {
    setup: function (fastify) {
        fastify.post("/v1/thumb/upload", async (req, res) => {
            try {
                const thumbData = await req.file({limits: {fileSize: 200000}})
                const thumbDataBuffer = await thumbData.toBuffer()

                const sha1 = await sha1FromStream(stream.Readable.from(thumbDataBuffer))
                const thumbnail = new ThumbnailModel({
                    sha1: sha1,
                    format: thumbData.mimetype,
                    data: thumbDataBuffer
                })

                await thumbnail.save()
                res.code(200)
            } catch (e) {
                console.log(e)
                res.code(400)
            }
        })

        fastify.get("/v1/thumb:sha1", async (req, res) => {
            try {
                const thumb = await ThumbnailModel.findOne({
                    sha1: req.query.sha1
                })
                res.type(thumb.format)
                res.send(thumb.data)
            } catch (e) {
                console.log(e)
                res.code(404)
            }
        })
    }
}