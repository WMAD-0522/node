import dotenv from 'dotenv';
import jwt from '../service/jwt.service.js';
import redisClient from '../service/redis.service.js';

dotenv.config();

const auth = async (req, res, next) => {
    const token = req.headers.authorization;

    const redisToken = await redisClient.get(token);

    if(!redisToken) {
        return res.status(401).json({
            status: "fail",
            message: "You are not authorized!"
        })
    }else{
        try {
            const decoded = jwt.verifyToken(token);

            if(decoded.exp < Math.floor(Date.now() / 1000)) {
                return res.status(401).json({
                    status: "fail",
                    message: "You are not authorized!"
                })
            }
            
            req.user = decoded.id;
            next();
        } catch (error) {
            return res.status(401).json({
                status: "fail",
                message: "You are not authorized!"
            })
        }
    }
}

export default auth;