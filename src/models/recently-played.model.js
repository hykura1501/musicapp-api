import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  userId: String,
  songId: String,
  updatedAt: Date,
});
const RecentlyPlayed = mongoose.model(
  "RecentlyPlayed",
  userSchema,
  "recently-played"
);
export default RecentlyPlayed;
