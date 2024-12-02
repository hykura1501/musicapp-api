import { Router } from "express";
import {
  addComment,
  getAllComments,
  deleteComment,
} from "@/controllers/comment.controller";
const router = Router();

router.post("/comment/:songId", addComment);
router.get("/comment/:songId", getAllComments);
router.delete("/comment/:songId/:commentId", deleteComment);

export default router;
