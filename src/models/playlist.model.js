import mongoose from "mongoose";
const playlistSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    title: {
      type: String,
    },
    songIds: [
      {
        songId: String,
      }
    ],
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  { timestamps: true }
);
const Playlist = mongoose.model("Playlist", playlistSchema, "playlists");
export default Playlist;
