import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import header from './middleware/header.js';
import todoRoute from './routes/todo.js';

const app = express();
app.set("view engine", "ejs");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'))

app.use(header);
app.use("/", todoRoute);

app.listen(3001, () => {
    console.log('Server is running on port 3001');
    }
);
