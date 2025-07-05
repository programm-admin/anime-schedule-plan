import express from "express";
import { createTV, updateTV } from "../../controllers/tv.controller";

const router = express.Router();

router.post("/new", createTV);
router.put("/update", updateTV);

export default router;
