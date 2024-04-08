import { prisma } from "./user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const createComment = async (req, res, next) => {
    try {
        const { comment } = req.body;
        const { id } = req.params;
        console.log(id);
        const token = req.cookies.jwt;
        console.log(token);
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("this is verify token ",verifyToken)
        const { id: userid } = verifyToken;
        const foundPost = await prisma.post.findFirst({
            where: {
                AND: [
                    {
                        userId: userid
                    },
                    {
                        id: id
                    }
                ]
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
// export const showComments = async (req: Request, res: Response, next: any) => {
//     try {
//         const token = req.cookies.token
//         const verify = jwt.verify(token, process.env.JWT_SECRET as string)
//         const { id } = verify as JwtPayload
//         const posts=
//     } catch (error) {
//     }
// }
