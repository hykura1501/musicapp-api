import { Router } from "express";
import {
  getAllPlaylists,
  createPlaylist,
  addSongToPlaylist,
  getSongsOfPlaylist
} from "@/controllers/playlist.controller";
import { loginRules, registerRules } from "@/validations/auth.rule";
import validate from "@/middlewares/validate";

const router = Router();
//authenticate
router.get("/", getAllPlaylists);
router.get("/:playlistId", getSongsOfPlaylist);
router.post("/", createPlaylist);
router.post("/add-song/:playlistId", addSongToPlaylist);

export default router;
