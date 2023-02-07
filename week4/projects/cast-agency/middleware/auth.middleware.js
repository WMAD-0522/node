import dotenv from 'dotenv';
import jwtToken from '../service/jwt.service.js';
import redisClient from "../service/redis.service.js";

dotenv.config();

const auth = async (req, res, next) => {

    // TODO: if token expired we should logout the user

    const token = req.headers.authorization;

    const redisToken = await redisClient.get(token);

    if(!redisToken){
        return res.status(401).json({
            status: "fail",
            message: "Unauthorized!"
        })
    }else{
        try{
            const decoded = jwtToken.verifyToken(token);

            if(decoded.exp < Math.floor(Date.now() / 1000)){
                return res.status(401).json({
                    status: "fail",
                    message: "Unauthorized!"
                })
            }

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