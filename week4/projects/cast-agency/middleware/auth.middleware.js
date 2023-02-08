import dotenv from 'dotenv';
import { createToken, verifyToken, isTokenExpired } from "../service/jwt.service.js"
import redisClient from "../service/redis.service.js";

dotenv.config();

const auth = async (req, res, next) => {

    // TODO:DONE if token expired we should logout the user

    const token = req.headers.authorization;

    const redisToken = await redisClient.get(token);

    if(!redisToken){
        return res.status(401).json({
            status: "fail",
            message: "Unauthorized!"
        })
    }else{
        try{
            // check if jwt expired then delete the token from redis
            if(isTokenExpired(token)) {
                await redisClient.del(token);
                return res.status(401).json({
                    status: "fail",
                    message: "Unauthorized!"
                })
            }

            const decoded = verifyToken(token);

            req.user = decoded.id;
            next();

        }catch(err){
            return res.status(500).json({
                status: "fail",
                message: "Unauthorized!"
            })
        }
    }
}

export default auth;