import { Router } from "express";
import {
  followArtist,
  unFollowArtist,
  getArtistDetail,
  getFollowingArtists
} from "@/controllers/artist.controller";
import authenticate from "@/middlewares/authenticate";
const router = Router();

router.post("/follow/:artistId", authenticate, followArtist);
router.post("/un-follow/:artistId", authenticate, unFollowArtist);
router.get("/detail/:artistId", getArtistDetail);

router.get("/following", authenticate, getFollowingArtists);
export default router;
