import { Router } from "express";
import {
  createSong,
  increaseView,
  increaseLike,
  getAllSongs,
  getTopLikeSongs,
  getPopularSongs,
  getFavoriteSongs,
  addFavoriteSong
} from "@/controllers/song.controller";
import authenticate from "@/middlewares/authenticate";
import multer from "multer";
import { uploadCloud } from "@/middlewares/uploadCloud";
import validate from "@/middlewares/validate";
import { createSongRules } from "@/validations/song.rule";

const router = Router();
const upload = multer();

router.post(
  "/",
  authenticate,
  upload.single("url"),
  uploadCloud("mp3"),
  validate(createSongRules),
  createSong
);

router.get("/", getAllSongs);

router.post("/increase-view/:songId", increaseView);
router.post("/increase-like/:songId", increaseLike);

router.get("/top-likes", getTopLikeSongs);
router.get("/popular", getPopularSongs);

router.get("/favorite", authenticate, getFavoriteSongs);
router.post("/favorite/add", authenticate, addFavoriteSong);

export default router;
