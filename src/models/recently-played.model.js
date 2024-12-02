import mongoose from "mongoose";
const recentlyPlayedSchema = new mongoose.Schema({
  userId: String,
  songId: String,
  updatedAt: Date,
});
const RecentlyPlayed = mongoose.model(
  "RecentlyPlayed",
  recentlyPlayedSchema,
  "recently-played"
);
export default RecentlyPlayed;
