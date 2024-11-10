import express from "express"
import { getUserDetails, login, logout, registerUser } from "../Controllers/userController.js"
import isAuthenticated from "../Middlewares/auth.js"

const userRouter = express.Router()

userRouter.post("/register", registerUser)
userRouter.post("/login", login)
userRouter.get("/logout", isAuthenticated, logout)
userRouter.get("/getUserDetails", isAuthenticated, getUserDetails)

export default userRouter