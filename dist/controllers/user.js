import { PrismaClient } from "@prisma/client";
import Cloudinary from "cloudinary";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError.js";
import dotenv from "dotenv";
dotenv.config();
const cloudinary = Cloudinary.v2;
const prisma = new PrismaClient();
export const registerUser = async (req, res, next) => {
    try {
        const file = req.files?.imgFile;
        const { password, username, email } = req.body;
        const hashpass = await bcrypt.hash(password, 12);
        const response = await cloudinary.uploader.upload(file?.tempFilePath, {
            folder: "twitter"
        });
        const newUser = await prisma.user.create({
            data: {
                img: response.secure_url,
                password: hashpass,
                username,
                email
            }
        });
        res.status(200).json({
            message: "user created",
            data: newUser
        });
    }
    catch (err) {
        next(err);
    }
};
export const loginUser = async (req, res, next) => {
    try {
        const { password, username } = req.body;
        const findUser = await prisma.user.findUnique({
            where: {
                username: username
            }
        });
        if (!findUser) {
            return next(new AppError("User not found", 404));
        }
        const { password: hashpass } = findUser;
        const verifyPass = await bcrypt.compare(password, hashpass);
        if (verifyPass) {
            const token = jwt.sign({ id: findUser.id }, process.env.JWT_SECRET);
            res.cookie("jwt", token);
            res.status(200).json({
                message: "logged In successfully",
                data: token
            });
        }
        else {
            next(new AppError("Username or Password Invalid", 401));
        }
    }
    catch (err) {
        next(err);
    }
};
