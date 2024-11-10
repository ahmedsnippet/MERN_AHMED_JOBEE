import dotenv from "dotenv"
import connectDB from "./Database/dbConnection.js"
import app from "./app.js"
import cloudinary from "cloudinary"

dotenv.config({
    path: "./.env"
})

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`SERVER IS LISTENING AT PORT : ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })



cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
})
