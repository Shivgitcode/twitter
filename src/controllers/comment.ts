import { prisma } from "./user.js";
import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()


export const createComment = async (req: Request, res: Response, next: any) => {
    try {
        const { comment } = req.body
        const { id } = req.params
        // console.log(id)
        const token = req.cookies.jwt
        console.log(token)
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET as string)
        console.log("this is verify token ", verifyToken)
        const { id: userid } = verifyToken as JwtPayload
        const foundPost = await prisma.post.findFirst({
            where: {
                id


            }
        })
        // t
        const postId = foundPost?.id
        console.log(postId)
        const newComment = await prisma.comment.create({
            data: {
                comment,
                postId: postId as string // Cast postId to string
            },

        })

        res.status(200).json({
            message: "comment created",
            data: newComment
        })

    } catch (error) {
        next(error)

    }


}


// export const showComments = async (req: Request, res: Response, next: any) => {
//     try {
//         const token = req.cookies.token
//         const verify = jwt.verify(token, process.env.JWT_SECRET as string)
//         const { id } = verify as JwtPayload
//         const posts =

//     } catch (error) {

//     }
// }
