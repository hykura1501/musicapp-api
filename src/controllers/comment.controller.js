import Comment from "@/models/comment.model";
import Song from "@/models/song.model";
// [POST] /comment/:songId
export const addComment = async (req, res) => {
  try {
    const { songId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;
    const song = await Song.findById(songId);
    if (!song) {
      return res.status(404).json({ code: 404, message: "Song not found" });
    }
    const comment = await Comment.create({ userId, songId, content });
    return res.status(201).json({ code: 201, data: comment });
  } catch (error) {
    return res.status(500).json({ code: 500, error: error.message });
  }
};

// [GET] /comment/:songId
export const getAllComments = async (req, res) => {
  try {
    const { songId } = req.params;
    const song = await Song.findById(songId);
    if (!song) {
      return res.status(404).json({ code: 404, message: "Song not found" });
    }
    const comments = await Comment.find({ songId })
      .populate("userId")
      .sort({ createdAt: -1 });
    return res.status(200).json({ code: 200, data: comments });
  } catch (error) {
    return res.status(500).json({ code: 500, error: error.message });
  }
};

// [DELETE] /comment/:songId/:commentId
export const deleteComment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { songId, commentId } = req.params;
    const song = await Song.findById(songId);
    if (!song) {
      return res.status(404).json({ code: 404, message: "Song not found" });
    }
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ code: 404, message: "Comment not found" });
    }
    if (comment.userId.toString() !== userId) {
      return res.status(403).json({ code: 403, message: "Forbidden" });
    }
    await Comment.deleteOne({ _id: commentId });
    return res.status(200).json({ code: 200, message: "Comment deleted" });
  } catch (error) {
    return res.status(500).json({ code: 500, error: error.message });
  }
};
