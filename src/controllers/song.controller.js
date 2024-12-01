import Song from "@/models/song.model";
import fancyTimeFormat from "@/helpers/fancyTimeFormat";

// [POST] /song
export const createSong = async (req, res) => {
  try {
    const userId = req.user.id;
    const { url, duration } = req.body;
    const song = new Song({ userId, url, duration });
    await song.save();
    return res.status(201).json({ code: 201, data: song });
  } catch (error) {
    return res.status(500).json({ code: 500, message: error.message });
  }
};
