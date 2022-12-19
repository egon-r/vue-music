import {mongoose} from "mongoose"

const songSchema = new mongoose.Schema({
    title: String,
    artist: String,
    album: String,
    year: Number,
    sha1: {
        type: String,
        index: true,
        unique: true,
    },
})
export const SongModel = mongoose.model("song", songSchema)