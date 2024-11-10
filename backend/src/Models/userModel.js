import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name Is Required"]
        },
        email: {
            type: String,
            required: [true, "Email Is Required"],
            validate: [validator.isEmail, "Please Provide A Valid Email"]
        },
        phone: {
            type: String,
            required: [true, "Phone Is Required"],
            minLength: [11, "Phone Number Must Contains 11 Digits"]
        },
        password: {
            type: String,
            required: [true, "Password Is Required"],
            minLength: [8, "Password Must Contains ATleast 8 Characters"],
            maxLength: [8, "Password Contains Maximum 18 Characters"]
        },
        role: {
            type: String,
            required: [true, "Please Select A Role"],
            enum: ["Job Seeker", "Employer"]
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    }
)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) next();
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.generateJWT = function () {
    return jwt.sign(
        { id: this.id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.JWT_SECRET_KEY_EXPIRES }
    )
}

export const User = mongoose.model("User", userSchema)