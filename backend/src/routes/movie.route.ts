import express from "express";
import { createNewMovie, updateMovie } from "../controllers/movie.controller";

const router = express.Router();

router.post("/new", createNewMovie);
router.put("/update", updateMovie);

export default router;
