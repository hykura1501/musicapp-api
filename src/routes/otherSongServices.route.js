import { Router } from "express";
import {
  updateRecentlyPlayed,
  getRecentlyPlayed,
  addDownloadedSongs,
  getDownloadedSongs,
} from "@/controllers/otherSongServices.controller";
const router = Router();

router.post("/recently-played/:songId", updateRecentlyPlayed);
router.get("/recently-played", getRecentlyPlayed);

router.post("/downloaded-songs", addDownloadedSongs);
router.get("/downloaded-songs", getDownloadedSongs);
export default router;
