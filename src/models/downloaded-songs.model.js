import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    userId: String,
    songId: String,
    localURL: String,
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const DownloadedSong = mongoose.model(
  "DownloadedSong",
  userSchema,
  "downloaded-songs"
);
export default DownloadedSong;
