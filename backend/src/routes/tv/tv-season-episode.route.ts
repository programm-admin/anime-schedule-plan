import express from "express";
import {
    createTVSeasonEpisode,
    updateTVSeasonEpisode,
} from "../../controllers/tv-season-episode.controller";

const router = express.Router();

router.post("/new", createTVSeasonEpisode);
router.put("/update", updateTVSeasonEpisode);

export default router;
