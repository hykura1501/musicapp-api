import { Router } from "express";
import {
  followArtist,
  unFollowArtist,
  getArtistDetail,
} from "@/controllers/artist.controller";
import authenticate from "@/middlewares/authenticate";
const router = Router();

router.post("/follow/:artistId", authenticate, followArtist);
router.post("/un-follow/:artistId", authenticate, unFollowArtist);
router.get("/detail/:artistId", getArtistDetail);
export default router;
