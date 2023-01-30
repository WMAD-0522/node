import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import productRouter from "./routes/product.js";
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.use(cors());

app.get("/health", (request, response) => {
    response.json({
        status: "UP",
        message: "Server is running"
    })
})

app.use("/", productRouter);

app.listen(3001, () => {
    console.log("Server is running on port 3001");
})