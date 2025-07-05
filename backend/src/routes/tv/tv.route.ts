import express from "express";
import { createTV, updateTV, deleteTV } from "../../controllers/tv.controller";

const router = express.Router();

router.post("/new", createTV);
router.put("/update", updateTV);
router.delete("/delete", deleteTV);

export default router;
