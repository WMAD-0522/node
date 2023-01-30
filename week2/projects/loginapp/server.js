import express from "express";
import sequelize from "sequelize";
import bodyParser from "body-parser";
import cors from "cors";
import User from "./models/user.model.js";
import authRoutes from "./routes/auth.js";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/auth", authRoutes);

app.listen(3001, () => {
    console.log("Server is running on port 3000");
});
