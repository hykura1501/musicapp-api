import Artist from "@/models/artist.model";
import User from "@/models/user.model";
import Song from "@/models/song.model";
// [POST] /artists/follow/:artistId
export const followArtist = async (req, res) => {
  try {
    const user = req.user;
    const artistId = req.params.artistId;
    if (!artistId) {
      return res
        .status(400)
        .json({ code: 400, message: "Missing required fields" });
    }
    const artist = await Artist.findOne({ _id: artistId });
    if (!artist) {
      return res.status(404).json({ code: 404, message: "Artist not found" });
    }
    const existed = user?.favoriteArtists?.some(
      (item) => item.artistId === artistId
    );
    if (existed) {
      return res.status(400).json({ code: 400, message: "Already followed" });
    }
    
    const newUser = await User.findOneAndUpdate(
      { _id: user._id },
      {
        $push: {
          favoriteArtists: {
            artistId,
          },
        },
      },
      { new: true }
    )
    await Artist.updateOne({ _id: artistId }, { $inc: { follower: 1 } });
    return res.status(200).json({
      code: 200,
      message: "Followed artist successfully",
      data: newUser.favoriteArtists,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 500, message: error.message });
  }
};

// [POST] /artists/un-follow/:artistId
export const unFollowArtist = async (req, res) => {
  try {
    const user = req.user;
    const artistId = req.params.artistId;
    if (!artistId) {
      return res
        .status(400)
        .json({ code: 400, message: "Missing required fields" });
    }
    const artist = await Artist.findById(artistId);
    if (!artist) {
      return res.status(404).json({ code: 404, message: "Artist not found" });
    }
    const existed = user?.favoriteArtists?.some(
      (item) => item.artistId === artistId
    );
    if (!existed) {
      return res.status(400).json({ code: 400, message: "Not followed yet" });
    }
    const newUser = await User.findOneAndUpdate(
      { _id: user._id },
      {
        $pull: {
          favoriteArtists: {
            artistId,
          },
        },
      },
      { new: true }
    );
    await Artist.updateOne({ _id: artistId }, { $inc: { follower: -1 } });
    return res.status(200).json({
      code: 200,
      message: "Un-followed artist successfully",
      data: newUser.favoriteArtists,
    });
  } catch (error) {
    return res.status(500).json({ code: 500, message: error.message });
  }
};

// [GET] /artists/detail/:artistId
export const getArtistDetail = async (req, res) => {
  try {
    const artistId = req.params.artistId;
    if (!artistId) {
      return res
        .status(400)
        .json({ code: 400, message: "Missing required fields" });
    }
    const artist = await Artist.findOne({
      artistId,
    })
    if (!artist) {
      return res.status(404).json({ code: 404, message: "Artist not found" });
    }
    const songs = await Song.find({ artistId }).select("-userId");;
    return res.status(200).json({
      code: 200,
      data: {
        artist,
        songs,
      },
    });
  } catch (error) {
    return res.status(500).json({ code: 500, message: error.message });
  }
};

export const getFollowingArtists = async (req, res) => { 
  try {
    const user = req.user;
    const artistIds = user.favoriteArtists.map((item) => item.artistId);
    const artists = await Artist.find({ _id: { $in: artistIds } });
    return res.status(200).json({
      code: 200,
      data: artists,
    });
  } catch (error) {
    return res.status(500).json({ code: 500, message: error.message }); 
  }
}