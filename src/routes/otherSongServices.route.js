import { Router } from "express";
import {
  updateRecentlyPlayed,
  getRecentlyPlayed,
  addDownloadedSongs,
  getDownloadedSongs
} from "@/controllers/otherSongServices.controller";
import authenticate from "@/middlewares/authenticate";
const router = Router();

router.post("/recently-played/:songId", authenticate, updateRecentlyPlayed);
router.get("/recently-played", authenticate, getRecentlyPlayed);

router.post("/downloaded-songs", authenticate, addDownloadedSongs);
router.get("/downloaded-songs", authenticate, getDownloadedSongs);

export default router;
