import Playlist from "@/models/playlist.model";
import Song from "@/models/song.model";
// [GET] /playlist
export const getAllPlaylists = async (req, res) => {
  try {
    const userId = req.user.id;
    const playlists = await Playlist.find({ userId, deleted: false });
    return res.status(200).json({ code: 200, data: playlists });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// [POST] /playlist
export const createPlaylist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title } = req.body;
    const playlist = await Playlist.create({ userId, title });
    return res.status(200).json({ code: 200, data: playlist });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// [DELETE] /playlist/:playlistId
export const deletePlaylist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { playlistId } = req.params;
    const playlist = await Playlist.findOne({
      _id: playlistId,
      userId,
      deleted: false,
    });
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }
    playlist.deleted = true;
    await playlist.save();
    return res
      .status(200)
      .json({ code: 200, message: "Delete playlist successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// [GET] /playlist/:playlistId
export const getSongsOfPlaylist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { playlistId } = req.params;
    const playlist = await Playlist.findOne({
      _id: playlistId,
      userId,
      deleted: false,
    });
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }
    const playlistSongs = playlist?.songs?.map((song) => song.songId);
    const songs = await Song.find({ _id: { $in: playlistSongs } });
    return res.status(200).json({
      code: 200,
      data: {
        playlistId: playlist._id,
        title: playlist.title,
        songs,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// [POST] /playlist/add-song/:playlistId
export const addSongToPlaylist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { playlistId } = req.params;
    const { songId } = req.body;
    const playlist = await Playlist.findOne({
      _id: playlistId,
      userId,
      deleted: false,
    });
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }
    const isExisted = playlist?.songs?.some((item) => item.songId === songId);
    if (isExisted) {
      return res.status(400).json({ message: "Song is already in playlist" });
    }
    const song = await Song.findById(songId);
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }
    playlist.songs.push({ songId });
    await playlist.save();
    return res.status(200).json(playlist);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
