import { cloudinary, prisma } from "./user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const createPost = async (req, res, next) => {
    try {
        const { title } = req.body;
        const file = req.files?.imgFile;
        console.log();
        const response = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "postimg"
        });
        const token = req.cookies.jwt;
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        const { id: userid } = verifyToken;
        const newPost = await prisma.post.create({
            data: {
                title,
                userId: userid,
                img: response.secure_url
            }
        });
        res.status(200).json({
            message: "post created",
            data: newPost
        });
    }
    catch (err) {
        next(err);
    }
};
export const showPost = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        const { id } = verify;
        const allPost = await prisma.post.findMany({
            include: {
                user: true,
                comments: true
            },
        });
        res.status(200).json({
            message: "these are all posts",
            data: allPost
        });
    }
    catch (err) {
        next(err);
    }
};
