import mongoose from "mongoose";
const commentSchema = new mongoose.Schema(
  {
    userId: String,
    songId: String,
    content: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  { timestamps: true }
);
const Comment = mongoose.model("Comment", commentSchema, "comments");
export default Comment;
