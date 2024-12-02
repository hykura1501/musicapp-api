import { Router } from "express";
import {
  addComment,
  getAllComments,
  deleteComment,
  editComment
} from "@/controllers/comment.controller";
import authenticate from "@/middlewares/authenticate";
const router = Router();

router.post("/:songId", authenticate, addComment);
router.get("/:songId", getAllComments);
router.delete("/:songId/:commentId", authenticate, deleteComment);
router.patch("/:songId/:commentId", authenticate, editComment);

export default router;
