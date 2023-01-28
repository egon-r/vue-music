import {mongoose, Schema} from "mongoose";

const songSchema = new mongoose.Schema({
  title: String,
  artist: String,
  album: String,
  year: Number,
  duration: Number,
  thumbnailSha1: String,
  sha1: {
    type: String,
    index: true,
    unique: true,
  },
});

const thumbnailSchema = new mongoose.Schema({
  sha1: {
    type: String,
    index: true,
    unique: true
  },
  format: String,
  data: Buffer,
})

export const SongModel = mongoose.model("song", songSchema);
export const ThumbnailModel = mongoose.model("thumbnail", thumbnailSchema);