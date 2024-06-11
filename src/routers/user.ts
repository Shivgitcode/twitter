import express from "express"
import { getAllUsers, getParticularUser, getUser, loginUser, logout, registerUser } from "../controllers/user.js"

const router = express.Router()


router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/user", getUser)
router.get("/user/:id", getParticularUser)
router.post("/logout", logout)
// router.get("/allUsers", getAllUsers)


export { router }