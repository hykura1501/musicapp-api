import authRoutes from "./auth.route";
import songRoutes from "./song.route";
import playlistRoutes from "./playlist.route";
import userRoutes from "./user.route";
import otherSongServicesRoutes from "./otherSongServices.route";
import artistRoutes from "./artist.route";
import authenticate from "@/middlewares/authenticate";
export default (app) => {
  app.use("/auth", authRoutes);
  app.use("/song", songRoutes);
  app.use("/playlist", authenticate, playlistRoutes);
  app.use("/user", userRoutes);
  app.use("/other", otherSongServicesRoutes);
  app.use("/artist", authenticate, artistRoutes);
};
