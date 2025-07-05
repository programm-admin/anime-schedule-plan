import express from "express";
import {
    createNewMovie,
    updateMovie,
    deleteMovie,
} from "../controllers/movie.controller";

const router = express.Router();

router.post("/new", createNewMovie);
router.put("/update", updateMovie);
router.delete("/delete", deleteMovie);

export default router;
