import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import db from "./models/index.js";
import employeeRoutes from "./routes/employee.route.js"
import departmentRoutes from "./routes/department.route.js"
import commentRoutes from "./routes/comment.route.js"
import homeRoutes from "./routes/home.route.js"

dotenv.config();
// dotenv.config will initialize the environment variables from the .env file

const PORT = process.env.PORT || 3001;

const app = express();

app.set("view engine", "ejs");
// app.set() will set the view engine to ejs

app.use(express.static("public"));
// app.use() will activate the public folder

app.use(cors());
// cors() will allow the server to accept requests from any origin

app.use(bodyParser.json());
// bodyParser.json() will parse the request body as JSON
app.use(bodyParser.urlencoded({ extended: true }));
// bodyParser.urlencoded() will parse the request body as URL encoded data
// { extended: true } will allow to parse nested objects

app.get("/health", (req, res) => {
    res.json({ message: `Server is running in port ${PORT}` });
});

app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT}`);
})

app.use("/", homeRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/department", departmentRoutes);
app.use("/api/comment", commentRoutes);

db.sequelize.sync({
    // force: true
    // force: true will drop the table if it already exists
}).then(() => {
    console.log("Synced with database");
}).catch((err) => {
    console.log(`Failed to sync with database: ${err}`);
})