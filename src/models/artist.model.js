import mongoose from "mongoose";
const artistSchema = new mongoose.Schema(
  {
    artistId: String,
    name: String,
    description: String,
    followers: String,
    avatar: String,
    birthday: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  { timestamps: true }
);
const Artist = mongoose.model("Artist", artistSchema, "artists");
export default Artist;
