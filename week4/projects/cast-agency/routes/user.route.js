import express from "express";
import jwt from "jsonwebtoken";
import User from "../modal/user.modal.js";
import bcrypt from "bcrypt";

const router = express.Router();

let createToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
}

router.post("/login", async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if(!user){
            return res.status(404).json({
                status: "fail",
                message: "User not found!"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect){
            return res.status(400).json({
                status: "fail",
                message: "Incorrect password!"
            })
        }

        const token = createToken({ id: user._id });

        res.status(200).json({
            status: "success",
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email
            }
        })

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!",
        })
    }
});

router.post("/register", async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({
                status: "fail",
                message: "Email already exists!"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            fullName: fullName,
            email: email,
            password: hashedPassword,
        });

        const result = await user.save();

        res.status(201).json({
            message: "User created successfully!",
            result
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!",
            error
        })
    }
});

export default router;