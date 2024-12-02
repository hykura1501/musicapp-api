import { Router } from "express";
import { followArtist, unFollowArtist } from "@/controllers/artist.controller";
const router = Router();

router.post("/follow/:artistId", followArtist);
router.post("/un-follow/:artistId", unFollowArtist);

export default router;
