import mongoose from "mongoose";
const songSchema = new mongoose.Schema(
  {
    title: String,
    artistId: String,
    artistName: String,
    thumbnail: String,
    url: String,
    duration: Number,
    view: {
      type: Number,
      default: 0,
    },
    like: {
      type: Number,
      default: 0,
    },
    album: String,
    lyric: String,
    userId: {
      type: String,
      default: "",
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  { timestamps: true }
);
const Song = mongoose.model("Song", songSchema, "songs");
export default Song;
