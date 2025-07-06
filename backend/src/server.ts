import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import userRoutes from "./routes/user.route";
import movieRoutes from "./routes/movie.route";
import tvRoutes from "./routes/tv/tv.route";
import tvSeasonRoutes from "./routes/tv/tv-season.route";
import tvSeasonEpisodeRoutes from "./routes/tv/tv-season-episode.route";
import { verifyToken } from "./middleware/authUser.middleware";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/movie", verifyToken, movieRoutes);
app.use("/api/tv-season-episode", verifyToken, tvSeasonEpisodeRoutes);
app.use("/api/tv-season", verifyToken, tvSeasonRoutes);
app.use("/api/tv", verifyToken, tvRoutes);

// DB & Server Start
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
