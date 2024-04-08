import express from "express";
import { createComment } from "../controllers/comment.js";
export const router = express.Router();
router.post("/comment/:id", createComment);
