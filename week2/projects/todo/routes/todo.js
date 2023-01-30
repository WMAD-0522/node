import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/", (req, res) => {
    fs.readFile('./public/data/todos.json', (err, data) => {
        if (err) throw err;
        let todos = JSON.parse(data);
        res.render("pages/index", {title: "Root", todos: todos});
    });
});

router.get("/new", (req, res) => {
    res.render("pages/new", {title: "New Todos", todos: []});
});

router.post("/:id", (req, res) => {
    fs.readFile('./public/data/todos.json', (err, data) => {
        if (err) throw err;
        let todos = JSON.parse(data);
        let todo = todos.find(todo => todo.id == req.params.id);
        let index = todos.indexOf(todo);
        todos.splice(index, 1);
        fs.writeFile('./public/data/todos.json', JSON.stringify(todos), (err) => {
            if (err) throw err;
            res.redirect("/");
        });
    });
});

router.post("/", (req, res) => {
    fs.readFile('./public/data/todos.json', (err, data) => {
        if (err) throw err;
        let todos = JSON.parse(data);
        let todo = {
            id: todos.length + 1,
            title: req.body.title,
            description: req.body.description,
            completed: req.body.completed
        };
        todos.push(todo);
        fs.writeFile('./public/data/todos.json', JSON.stringify(todos), (err) => {
            if (err) throw err;
            res.redirect("/");
        });
    });
});

// add new todo

// edit new todo
router.get("/:id/edit", (req, res) => {
    fs.readFile('./public/data/todos.json', (err, data) => {
        if (err) throw err;
        let todos = JSON.parse(data);
        let todo = todos.find(todo => todo.id == req.params.id);
        res.render("pages/edit", {title: "Edit Todos", todo: todo});
    });
});

router.post("/:id/edit", (req, res) => {
    fs.readFile('./public/data/todos.json', (err, data) => {
        if (err) throw err;
        let todos = JSON.parse(data);
        let todo = todos.find(todo => todo.id == req.params.id);
        let index = todos.indexOf(todo);
        todos[index].title = req.body.title;
        todos[index].description = req.body.description;
        todos[index].completed = req.body.completed;
        fs.writeFile('./public/data/todos.json', JSON.stringify(todos), (err) => {
            if (err) throw err;
            res.redirect("/");
        });
    });
});

export default router;
