import mongoose from "mongoose";
const downloadedSongSchema = new mongoose.Schema(
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
  downloadedSongSchema,
  "downloaded-songs"
);
export default DownloadedSong;
