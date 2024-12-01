import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: String,
    username: String,
    email: String,
    password: String,
    avatar: String,
    songUploaded: [
      {
        songId: String,
      },
    ],
    favoriteSong: [
      {
        songId: String,
      },
    ],
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema, "users");
export default User;