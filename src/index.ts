import express, { Request, Response } from "express"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import fileUpload from "express-fileupload"
import { router as userRouter } from "./routers/user.js"
import { cloudinaryConnect } from "./cloudinary/config.js"

dotenv.config()


export const app = express()

app.use(express.json())


app.use(cookieParser())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}

))

cloudinaryConnect()

app.use("/api/v1", userRouter)

app.use((err: any, req: Request, res: Response, next: () => void) => {
    const { message = "internal server Error", status = 500 } = err

    res.status(status).json({
        message: message,
        success: false
    })


})



app.listen(process.env.PORT, () => {
    console.log(`Server listening on Port ${process.env.PORT}`)
})