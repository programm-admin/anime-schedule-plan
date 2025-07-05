import express from "express";
import {
    createTVSeasonEpisode,
    updateTVSeasonEpisode,
    deleteTVSeasonEpisode,
} from "../../controllers/tv-season-episode.controller";

const router = express.Router();

router.post("/new", createTVSeasonEpisode);
router.put("/update", updateTVSeasonEpisode);
router.delete("/delete", deleteTVSeasonEpisode);

export default router;
