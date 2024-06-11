import express from "express"
import { createPost, showPost, showOnePost } from "../controllers/post.js"

export const router = express.Router()

router.post("/post", createPost)
router.get("/post", showPost)
router.get("/post/:id", showOnePost)