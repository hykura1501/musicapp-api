import { Router } from "express";
import {
  updateRecentlyPlayed,
  getRecentlyPlayed,
} from "@/controllers/otherSongServices.controller";
import authenticate from "@/middlewares/authenticate";
const router = Router();

router.post("/recently-played/:songId", authenticate, updateRecentlyPlayed);
router.get("/recently-played", authenticate, getRecentlyPlayed);

export default router;
