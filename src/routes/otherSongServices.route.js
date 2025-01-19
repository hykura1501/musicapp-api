import { Router } from "express";
import {
  updateRecentlyPlayed,
  getRecentlyPlayed,
  addDownloadedSongs,
  getDownloadedSongs,
  getUploadedSongs
} from "@/controllers/otherSongServices.controller";
const router = Router();

router.post("/recently-played/:songId", updateRecentlyPlayed);
router.get("/recently-played", getRecentlyPlayed);

router.post("/downloaded-songs", addDownloadedSongs);
router.get("/downloaded-songs", getDownloadedSongs);

router.get("/uploaded-songs", getUploadedSongs);
export default router;
