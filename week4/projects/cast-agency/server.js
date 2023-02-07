import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";
import redisClient from "./service/redis.service.js";
import agencyRoutes from "./routes/castagency.route.js";
import actorRoutes from "./routes/actor.route.js";

import db from "./config/db.config.js";

dotenv.config();
const app = express();

(async () => {
    try{
        await redisClient.connect();
    }
    catch(err){
        console.log(err);
    }
})();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
    res.json({
        status: "ok",
        author: "kubilaycakmak",
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/agency", agencyRoutes);
app.use("/api/actors", actorRoutes);

app.listen(process.env.PORT, () => {
    console.log("Server is running on port " + process.env.PORT + "...");
});