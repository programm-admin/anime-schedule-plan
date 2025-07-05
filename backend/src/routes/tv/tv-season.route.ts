import express from "express";
import {
    createTVSeason,
    updateTVSeason,
} from "../../controllers/tv-season.controller";

const router = express.Router();

router.post("/new", createTVSeason);
router.put("/update", updateTVSeason);

export default router;
