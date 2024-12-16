import Song from "@/models/song.model";
import User from "@/models/user.model";

// [POST] /song
export const createSong = async (req, res) => {
  try {
    const userId = req.user.id;
    const { url, title, duration } = req.body;
    const user = await User.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        $push: {
          uploadedSongs: { path: url, title, duration: parseInt(duration) },
        },
      },
      {
        new: true,
      }
    );
    return res.status(201).json({ code: 201, data: user.uploadedSongs });
  } catch (error) {
    return res.status(500).json({ code: 500, message: error.message });
  }
};

// [GET] /song/:songId
export const getSongDetail = async (req, res) => {
  try {
    const songId = req.params.songId;
    const song = await Song.findOne({ _id: songId }).select("-userId");
    if (!song) {
      return res.status(404).json({ code: 404, message: "Song not found" });
    }
    return res.status(200).json({ code: 200, data: song });
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message });
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
    ).select("-userId");
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
    ).select("-userId");
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
    });
    const songs = await Song.find({
      title: new RegExp(keyword, "i"),
    })
      .select("-userId")
      .limit(query.perPage)
      .skip((query.page - 1) * query.perPage);
    return res.status(200).json({
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

// [GET] /song/top-likes
export const getTopLikeSongs = async (req, res) => {
  try {
    const query = {
      page: parseInt(req.query.page) || 1,
      perPage: parseInt(req.query.perPage) || 10,
    };
    const count = await Song.countDocuments({});
    const songs = await Song.find({})
      .select("-userId")
      .sort({ like: -1 })
      .limit(query.perPage)
      .skip((query.page - 1) * query.perPage);
    return res.status(200).json({
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

// [GET] /song/popular
export const getPopularSongs = async (req, res) => {
  try {
    const query = {
      page: parseInt(req.query.page) || 1,
      perPage: parseInt(req.query.perPage) || 10,
    };
    const count = await Song.countDocuments({});
    const songs = await Song.find({})
      .select("-userId")
      .sort({ view: -1 })
      .limit(query.perPage)
      .skip((query.page - 1) * query.perPage);
    return res.status(200).json({
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

// [GET] /song/new-release
export const getNewReleaseSongs = async (req, res) => {
  try {
    const query = {
      page: parseInt(req.query.page) || 1,
      perPage: parseInt(req.query.perPage) || 10,
    };
    const count = await Song.countDocuments({});
    const songs = await Song.find({})
      .select("-userId")
      .sort({ createdAt: -1 })
      .limit(query.perPage)
      .skip((query.page - 1) * query.perPage);
    return res.status(200).json({
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

// [GET] /song/favorite
export const getFavoriteSongs = async (req, res) => {
  try {
    const query = {
      page: parseInt(req.query.page) || 1,
      perPage: parseInt(req.query.perPage) || 10,
    };

    const favoriteSongIds = req.user.favoriteSongs;

    const count = await Song.countDocuments({
      _id: { $in: favoriteSongIds.map((item) => item.songId) },
    });

    const favoriteSongs = await Song.find({
      _id: { $in: favoriteSongIds.map((item) => item.songId) },
    })
      .select("-userId")
      .limit(query.perPage)
      .skip((query.page - 1) * query.perPage);
    return res.status(200).json({
      code: 200,
      favoriteSongs: favoriteSongs,
      ...query,
      total: count,
      totalPage: Math.ceil(count / query.perPage),
    });
  } catch (error) {
    return res.status(500).json({ code: 500, message: error.message });
  }
};

// [POST] /song/favorite/add/:songId
export const addFavoriteSong = async (req, res) => {
  try {
    const user = req.user;
    const { songId } = req.params;
    const isExisted = user.favoriteSongs?.some(
      (item) => item.songId === songId
    );
    if (isExisted) {
      return res.status(400).json({
        code: 400,
        message: "Song is already in favorite list",
      });
    }

    const song = await Song.findOne({ _id: songId }).select("-userId");
    if (!song) {
      return res.status(404).json({ code: 404, message: "Song not found" });
    }

    await User.updateOne(
      {
        _id: user.id,
      },
      {
        $push: {
          favoriteSongs: { songId },
        },
      }
    );

    return res.status(200).json({
      code: 200,
      data: song,
      message: "Add favorite song successfully",
    });
  } catch (error) {
    return res.status(500).json({ code: 500, message: error.message });
  }
};

// [POST] /song/favorite/remove/:songId
export const removeFavoriteSong = async (req, res) => {
  try {
    const user = req.user;
    const { songId } = req.params;
    const isExisted = user.favoriteSongs?.some(
      (item) => item.songId === songId
    );
    if (!isExisted) {
      return res.status(400).json({
        code: 400,
        message: "Song is not in favorite list",
      });
    }

    const song = await Song.findOne({ _id: songId });
    if (!song) {
      return res.status(404).json({ code: 404, message: "Song not found" });
    }
    await User.updateOne(
      {
        _id: user.id,
      },
      {
        $pull: {
          favoriteSongs: { songId },
        },
      }
    );

    return res.status(200).json({
      code: 200,
      message: "Remove favorite song successfully",
    });
  } catch (error) {
    return res.status(500).json({ code: 500, message: error.message });
  }
};
