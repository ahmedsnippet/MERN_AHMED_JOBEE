import { asyncHandler } from "../Utils/asyncHandler.js"
import apiError from "../Utils/apiError.js"
import { User } from "../Models/userModel.js"
import jwt from "jsonwebtoken"


const isAuthenticated = asyncHandler(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new apiError("User Is Not Authenticated", 401))
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = await User.findById(decoded.id)
    next()
})

export default isAuthenticated