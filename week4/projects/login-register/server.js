import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
// import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();

const secretKey = "blablasomething";

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/register", (req, res) => {

    const { email, password } = req.body;
    // check from db, if this email exists..

    bcrypt.genSalt(10, (error, salt) => {
        console.log(salt);
        bcrypt.hash(password, salt, (error, hash) => {

          console.log('Hashed Password:', hash);
        });
    });
      
});

app.post("/login", (req, res) => {

    const { email, password } = req.body;

    let token = jwt.sign({ email: email, id: 2 }, secretKey, { expiresIn: "2h" });

    console.log(token);

    jwt.verify(token, secretKey, (err, decoded) =>  {
        console.log(err);
        console.log(decoded);
    })


})

app.get("/books", (req, res) =>  {
    // 
})

app.get("/health", (req, res) => {
    res.json({
        message: "server is healthy.."
    })
})

app.listen(3002, (req, res) => {
    console.log("Server is listening to PORT = 3002");
});