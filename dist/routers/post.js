import express from "express";
import { createPost, showPost } from "../controllers/post.js";
export const router = express.Router();
router.post("/post", createPost);
router.get("/post", showPost);
