import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import userRoutes from "./routes/user.route";
import movieRoutes from "./routes/movie.route";
import tvRoutes from "./routes/tv/tv.route";
import tvSeasonRoutes from "./routes/tv/tv-season.route";
import tvSeasonEpisodeRoutes from "./routes/tv/tv-season-episode.route";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/movie", movieRoutes);
app.use("/api/tv-season-episode", tvSeasonEpisodeRoutes);
app.use("/api/tv-season", tvSeasonRoutes);
app.use("/api/tv", tvRoutes);

// DB & Server Start
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
