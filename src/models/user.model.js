import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    fullName: String,
    username: String,
    email: String,
    password: String,
    avatar: String,
    uploadedSongs: [
      {
        title: String,
        url: String,
        duration: Number,
      },
    ],
    favoriteSongs: [
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
