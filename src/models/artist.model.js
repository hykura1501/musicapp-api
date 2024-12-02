import mongoose from "mongoose";
const artistSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    follower: String,
    avatar: String,
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
