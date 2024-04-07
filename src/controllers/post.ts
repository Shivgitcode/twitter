import { prisma } from "./user.js";
import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export const createPost = async (req: Request, res: Response, next: any) => {
    try {
        const { title } = req.body
        const token = req.cookies.jwt
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET as string)
        const { id: userid } = verifyToken as JwtPayload
        const newPost = await prisma.post.create({
            data: {
                title,
                userId: userid


            }
        })

        res.status(200).json({
            message: "post created",
            data: newPost
        })


    }
    catch (err) {
        next(err)

    }



}

export const showPost = async (req: Request, res: Response, next: any) => {
    try {
        const token = req.cookies.jwt
        const verify = jwt.verify(token, process.env.JWT_SECRET as string)
        const { id } = verify as JwtPayload
        const allPost = await prisma.post.findMany({
            include: {
                user: true,
                comments: true
            },
            where: {
                userId: id
            }
        })

        res.status(200).json({
            message: "these are all posts",
            data: allPost
        })

    }
    catch (err) {
        next(err)

    }
}