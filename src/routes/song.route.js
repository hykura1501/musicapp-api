import { Router } from "express";
import { createSong } from "@/controllers/song.controller";
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

export default router;
