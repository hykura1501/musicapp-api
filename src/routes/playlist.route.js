import { Router } from "express";
import {
  getAllPlaylists,
  createPlaylist,
  addSongToPlaylist,
  getSongsOfPlaylist,
  deletePlaylist,
  removeSongFromPlaylist
} from "@/controllers/playlist.controller";
import { loginRules, registerRules } from "@/validations/auth.rule";
import validate from "@/middlewares/validate";

const router = Router();
//authenticate
router.get("/", getAllPlaylists);
router.get("/:playlistId", getSongsOfPlaylist);
router.delete("/:playlistId", deletePlaylist);
router.post("/", createPlaylist);
router.post("/add-song/:playlistId", addSongToPlaylist);
router.delete("/remove-song/:playlistId", removeSongFromPlaylist);

export default router;
