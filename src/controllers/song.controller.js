import Song from "@/models/song.model";
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

// [POST] /song/increase-view/:songId
export const increaseView = async (req, res) => {
  try {
    const songId = req.params.songId;
    const song = await Song.findOneAndUpdate(
      { _id: songId },
      { $inc: { view: 1 } },
      { new: true }
    );
    return res
      .status(200)
      .json({ code: 200, song, message: "Increase view successfully" });
  } catch (error) {
    return res.status(500).json({ code: 500, message: error.message });
  }
};

// [POST] /song/increase-like
export const increaseLike = async (req, res) => {
  try {
    const songId = req.params.songId;
    const song = await Song.findOneAndUpdate(
      { _id: songId },
      { $inc: { like: 1 } },
      { new: true }
    );
    return res
      .status(200)
      .json({ code: 200, song, message: "Increase like successfully" });
  } catch (error) {
    return res.status(500).json({ code: 500, message: error.message });
  }
};

// [GET] /song
export const getAllSongs = async (req, res) => {
  try {
    const keyword = req.query?.keyword?.trim()?.toLowerCase();
    const query = {
      page: parseInt(req.query.page) || 1,
      perPage: parseInt(req.query.perPage) || 10,
    };
    const count = await Song.countDocuments({
      title: new RegExp(keyword, "i"),
      userId: null,
    });
    const songs = await Song.find({
      title: new RegExp(keyword, "i"),
      userId: null,
    })
      .limit(query.perPage)
      .skip((query.page - 1) * query.perPage);
    return res
      .status(200)
      .json({
        code: 200,
        data: songs,
        ...query,
        total: count,
        totalPage: Math.ceil(count / query.perPage),
      });
  } catch (error) {
    return res.status(500).json({ code: 500, message: error.message });
  }
};
