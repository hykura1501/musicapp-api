import RecentlyPlayed from "@/models/recently-played.model";
import Song from "@/models/song.model";
import DownloadedSong from "@/models/downloaded-songs.model";
import { sortByKey } from "@/helpers/sortByKey";
// [POST] /other/recently-played
export const updateRecentlyPlayed = async (req, res) => {
  try {
    const userId = req.user.id;
    const { songId } = req.params;
    const song = await Song.findById(songId);
    if (!song) {
      return res.status(404).json({ code: 404, message: "Song not found" });
    }

    const exists = await RecentlyPlayed.findOne({ userId, songId });
    if (!exists) {
      await RecentlyPlayed.create({ userId, songId, updatedAt: Date.now() });
      return res
        .status(201)
        .json({ code: 201, message: "Added to recently played" });
    }

    await RecentlyPlayed.updateOne(
      { userId, songId },
      { updatedAt: Date.now() }
    );
    return res
      .status(200)
      .json({ code: 200, message: "Updated recently played" });
  } catch (error) {
    console.error("Error updating recently played:", error);
    res.status(500).json({ code: 500, error: error.message });
  }
};

// [GET] /other/recently-played
export const getRecentlyPlayed = async (req, res) => {
  try {
    const userId = req.user.id;

    const recentlyPlayed = await RecentlyPlayed.find({ userId }).sort({
      updatedAt: -1,
    });
    const songIds = recentlyPlayed.map((item) => item.songId.toString());

    const songs = await Song.find({ _id: { $in: songIds } });

    const sortedSongs = sortByKey(songs, songIds, "_id");

    return res.status(200).json({ code: 200, data: sortedSongs });
  } catch (error) {
    console.error("Error getting recently played:", error);
    res.status(500).json({ code: 500, error: error.message });
  }
};

// [POST] /other/downloaded-songs
export const addDownloadedSongs = async (req, res) => {
  try {
    const userId = req.user.id;
    const { songId, localURL } = req.body;

    const song = await Song.findById(songId);
    if (!song) {
      return res.status(404).json({ code: 404, message: "Song not found" });
    }
    const exists = await DownloadedSong.findOne({
      userId,
      songId,
      deleted: false,
    });
    if (exists) {
      return res
        .status(400)
        .json({ code: 400, message: "Song already downloaded" });
    }
    await DownloadedSong.create({ userId, songId, localURL });
    return res.status(201).json({ code: 201, message: "Song downloaded" });
  } catch (error) {
    res.status(500).json({ code: 500, error: error.message });
  }
};

// [GET] /other/downloaded-songs
export const getDownloadedSongs = async (req, res) => {
  try {
    const userId = req.user.id;
    const downloadedSongs = await DownloadedSong.find({
      userId,
      deleted: false,
    });
    if (!downloadedSongs) {
      return res
        .status(404)
        .json({ code: 404, message: "No downloaded songs found" });
    }
    const songIds = downloadedSongs.map((item) => item.songId.toString());
    const songs = await Song.find({ _id: { $in: songIds } });
    const sortedSongs = sortByKey(songs, songIds, "_id");
    return res.status(200).json({ code: 200, data: sortedSongs });
  } catch (error) {
    return res.status(500).json({ code: 500, error: error.message });
  }
};

// [POST] /other/uploaded-songs

export const getUploadedSongs = async (req, res) => { 
  try {
    const user = req.user;
    const uploadedSongs = user.uploadedSongs;
    if (!uploadedSongs) {
      return res.status(404).json({ code: 404, message: "No uploaded songs found" });
    }
    return res.status(200).json({ code: 200, data: uploadedSongs });
  } catch (error) {
    return res.status(500).json({ code: 500, error: error.message });
  }
}