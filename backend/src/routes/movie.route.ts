import express from "express";
import {
    createNewMovie,
    updateMovie,
    deleteMovie,
    getMovieById,
} from "../controllers/movie.controller";

const router = express.Router();

router.post("/new", createNewMovie);
router.patch("/update", updateMovie);
router.delete("/delete", deleteMovie);
router.post("/get-movie", getMovieById);

export default router;
