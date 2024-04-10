import express from "express";
import { getUser, loginUser, logout, registerUser } from "../controllers/user.js";
const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user", getUser);
router.post("/logout", logout);
export { router };
