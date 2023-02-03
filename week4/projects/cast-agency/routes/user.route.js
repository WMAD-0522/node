import express from "express";
import User from "../modal/user.modal.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwtToken from "../service/jwt.service.js";
import redisClient from "../service/redis.service.js";

dotenv.config();

const router = express.Router();

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

        const token = jwtToken.createToken({ id: user._id });

        await redisClient.set(token.toString(), user._id.toString());

        res.header("Authorization", token).status(200).json({
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

router.get("/", (req, res) => {
    User.find()
    .then((users) => {
        res.status(200).json({
            message: "Users fetched successfully!",
            users
        })
    })
    .catch((error) => {
        res.status(500).json({
            message: "Something went wrong!",
            error
        })
    })
});

router.post("/logout", (req, res, next) => {
    const token = req.headers.authorization.toString();
    console.log(token);

    res.status(200).json({
        status: "success",
        message: "User logged out successfully!"
    })
})

export default router;