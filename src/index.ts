import express, { NextFunction, Request, Response } from "express"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import fileUpload from "express-fileupload"
import { router as userRouter } from "./routers/user.js"
import { cloudinaryConnect } from "./cloudinary/config.js"
import { router as postRouter } from "./routers/post.js"
import { router as commentRouter } from "./routers/comment.js"
import cors from "cors"


dotenv.config()


export const app = express()


app.use(cors({
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
    origin: "http://localhost:5173"

}))


app.use(express.json())


app.use(cookieParser())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}

))

cloudinaryConnect()

app.use("/api/v1", userRouter, postRouter, commentRouter)


app.use((err: any, req: Request, res: Response, next: NextFunction): void => {
    const { message = "internal server Error", status = 500 } = err

    res.status(status).json({
        message: message,
        success: false
    })
    next(err)


})



app.listen(process.env.PORT, () => {
    console.log(`Server listening on Port ${process.env.PORT}`)
})