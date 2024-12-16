import User from "@/models/user.model";
import Song from "@/models/song.model";
import Artist from "@/models/artist.model";
// [GET] /user/me
export const getMe = async (req, res) => {
  try {
    req.user.password = undefined;
    const favoriteSongIds = req.user.favoriteSongs.map((song) => song.songId);
    const favoriteArtistIds = req.user.favoriteArtists.map(
      (artist) => artist.artistId
    );
    const favoriteSongs = [];
    for (let id of favoriteSongIds) {
      const song = await Song.findById(id);
      if (song) {
        favoriteSongs.push(song);
      }
    }
    const favoriteArtists = [];
    for (let id of favoriteArtistIds) {
      const artist = await Artist.findById(id);
      if (artist) {
        favoriteArtists.push(artist);
      }
    }
    return res.status(200).json({
      code: 200,
      data: {
        ...req.user._doc,
        favoriteSongs,
        favoriteArtists,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// [GET] /user/profile/:userId
export const detailUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select(
      "-password -songUploaded -favoriteSong"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ code: 200, data: user });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// [PATCH] /user/update
export const updateMe = async (req, res) => {
  try {
    const body = req.body;
    const userId = req.user.id;
    if (body.email) {
      const emailExist = await User.findOne({ email: body.email });
      if (emailExist) {
        return res.status(400).json({ message: "Email already exists" });
      }
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ code: 200, data: user });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
