import { User } from "../Models/userModel.js"
import { asyncHandler } from "../Utils/asyncHandler.js"
import apiError from "../Utils/apiError.js"


const generateToken = (user, statusCode, res, message) => {
    const token = user.generateJWT()
    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,
        sameSite: "None"
    }
    res
        .status(statusCode)
        .cookie("token", token, options)
        .json({
            success: true,
            user,
            message,
            token
        })
}

const registerUser = asyncHandler(async (req, res, next) => {
    const { name, email, phone, role, password } = req.body
    //console.log(name)
    if (!name || !email || !phone || !role || !password) {
        return next(new apiError("All Fields Are Required", 400))
    }

    const existedUser = await User.findOne({ email })

    if (existedUser) {
        return next(new apiError("User Already Existed!", 400))
    }
    const user = await User.create({
        name,
        email,
        phone,
        role,
        password
    })
    res.status(200).json({
        success: true,
        message: "User Registered Successfully",
        user
    })

})

const login = asyncHandler(async (req, res, next) => {
    const { email, password, role } = req.body
    if (!email || !password || !role) {
        return next(new apiError("Please provide email ,password and role.", 400))
    }

    const user = await User.findOne({ email })

    if (!user) {
        return next(new apiError("Invalid Email Or Password.", 400))
    }

    const isPasswordMatch = await user.comparePassword(password)

    if (!isPasswordMatch) {
        return next(new apiError("Invalid Email Or Password", 400))
    }

    // check Role Is Match Or Not

    if (user.role !== role) {
        return next(new apiError(`User with provided email and ${role} not found!`, 404))
    }

    // res.status(200).json({
    //     success: true,
    //     message: "User loggedIn",
    //     user
    // })
    generateToken(user, 200, res, "User loggedIn")

})
const logout = asyncHandler(async (req, res, next) => {
    res
        .status(200)
        .clearCookie("token")
        .json({
            success: true,
            message: "User Logged Out Successfully"
        })
    // .cookie("User", "", {
    //     httpOnly: true,
    //     expires: new Date(Date.now()),
    // })
})

const getUserDetails = asyncHandler(async (req, res, next) => {
    const user = req.user
    res.status(200).json({
        success: true,
        user
    })
})

export { registerUser, login, logout, getUserDetails }