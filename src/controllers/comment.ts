import { prisma } from "./user.js";
import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()


export const createComment = async (req: Request, res: Response, next: any) => {
    try {
        const { comment } = req.body
        const token = req.cookies.jwt
        console.log(token)
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET as string)
        // console.log("this is verify token ",verifyToken)
        const { id } = verifyToken as JwtPayload
        const foundPost = await prisma.post.findFirst({
            where: {
                userId: id

            }
        })
        const postId = foundPost?.id
        const newComment = await prisma.comment.create({
            data: {
                comment,
                postId: postId as string // Cast postId to string
            }
        })

        res.status(200).json({
            message: "comment created",
            data: newComment
        })

    } catch (error) {
        next(error)

    }

}
