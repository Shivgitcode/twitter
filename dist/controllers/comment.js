import { prisma } from "./user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const createComment = async (req, res, next) => {
    try {
        const { comment } = req.body;
        const token = req.cookies.jwt;
        console.log(token);
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("this is verify token ",verifyToken)
        const { id } = verifyToken;
        const foundPost = await prisma.post.findFirst({
            where: {
                userId: id
            }
        });
        const postId = foundPost?.id;
        const newComment = await prisma.comment.create({
            data: {
                comment,
                postId: postId // Cast postId to string
            }
        });
        res.status(200).json({
            message: "comment created",
            data: newComment
        });
    }
    catch (error) {
        next(error);
    }
};
