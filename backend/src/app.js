import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { errorHandler } from "./Utils/apiError.js"
import fileUpload from "express-fileupload"
import userRouter from "./Routers/userRouter.js"
import jobRouter from "./Routers/jobRouter.js"
import applicationRouter from "./Routers/applicationRouter.js"

const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp/"
}))


app.use("/api/v1/user", userRouter)
app.use("/api/v1/jobs", jobRouter)
app.use("/api/v1/application", applicationRouter)


app.use(errorHandler)
export default app