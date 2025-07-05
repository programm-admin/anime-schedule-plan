import express from "express";
import {
    createTVSeason,
    updateTVSeason,
    deleteTVSeason,
} from "../../controllers/tv-season.controller";

const router = express.Router();

router.post("/new", createTVSeason);
router.put("/update", updateTVSeason);
router.delete("/delete", deleteTVSeason);

export default router;
