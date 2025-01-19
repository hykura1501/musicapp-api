import authRoutes from "./auth.route";
import songRoutes from "./song.route";
import playlistRoutes from "./playlist.route";
import userRoutes from "./user.route";
import otherSongServicesRoutes from "./otherSongServices.route";
import artistRoutes from "./artist.route";
import commentRoutes from "./comment.route";
import paymentRoutes from "./payment.route";
import authenticate from "@/middlewares/authenticate";
export default (app) => {
  app.use("/auth", authRoutes);
  app.use("/song", songRoutes);
  app.use("/playlist", authenticate, playlistRoutes);
  app.use("/user", userRoutes);
  app.use("/other", authenticate, otherSongServicesRoutes);
  app.use("/artist", artistRoutes);
  app.use("/comment", commentRoutes);
  app.use("/payment", authenticate, paymentRoutes);
};
