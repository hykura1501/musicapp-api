import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    title: {
      type: String,
    },
    songs: [
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
const Playlist = mongoose.model("Playlist", userSchema, "playlists");
export default Playlist;
