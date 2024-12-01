import authRoutes from "./auth.route";
import songRoutes from "./song.route";
export default (app) => { 
	app.use("/auth", authRoutes);
	app.use("/song", songRoutes);
}
