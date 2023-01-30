import express from "express";
import User from "../models/user.model.js";

const router = express.Router();

router.get("/", (req, res) => {
    // get data from mysql2 sequelize
    User.findAll().then((users) => {
        console.log(users);
        res.send(users);
    });
});

router.post("/register", (req, res) => {
    // get data from mysql2 sequelize
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    }).then((user) => {
        res.render("pages/login")
    });
});

router.post("/login", (req, res) => {
    // get data from mysql2 sequelize
    User.findOne({
        where: {
            email: req.body.email,
            password: req.body.password,
        },
    }).then((user) => {
        if(user){
            // res.send(user);
            res.redirect("/dashboard")
        }else{
            res.json({
                message: "Invalid email or password",
            });
        }
    });
});






export default router;