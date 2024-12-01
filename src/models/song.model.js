import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    title: String,
    artistID: String,
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
const Song = mongoose.model("Song", userSchema, "songs");
export default Song;