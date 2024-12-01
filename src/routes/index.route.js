import authRoutes from "./auth.route";
import songRoutes from "./song.route";
import playlistRoutes from "./playlist.route";
import authenticate from "@/middlewares/authenticate";
export default (app) => {
  app.use("/auth", authRoutes);
  app.use("/song", songRoutes);
  app.use("/playlist", authenticate, playlistRoutes);
};
