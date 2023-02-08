import User from '../models/user.model.js';
import redisClient from "../service/redis.service.js";

export const me = async (req, res) => {
    const token = req.headers.authorization;

    try{
        const userId = await redisClient.get(token);

        let user = await User.findById(userId).populate("agency");

        res.status(200).json({
            status: "success",
            user
        });

    }catch(err){
        res.status(500).json({
            status: "fail",
            message: "Something went wrong!",
            err
        })
    }
}

export const updateInformations = async (req, res) => {
    const id = req.user;

    const updatedData = req.body;

    if(updatedData.email || updatedData.password){
        return res.status(400).json({
            status: "fail",
            message: "You can't update email or password!"
        })
    }

    try{

        let user = await User.findByIdAndUpdate({ _id: id }, updatedData, {new: true});

        res.status(200).json({
            status: "success",
            message: "User updated successfully!",
            user
        });

    }catch(err){
        res.status(500).json({
            status: "fail",
            message: "Something went wrong!",
            err
        })
    }

}

