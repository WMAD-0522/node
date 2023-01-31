const todos = [
    {
        id: 1,
        title: "Todo 1",
        completed: false
    },
    {
        id: 2,
        title: "Todo 2",
        completed: true
    },
    {
        id: 3,
        title: "Todo 3",
        completed: false
    },
];

app.post("/todos", (req, res) => {
    const { title } = req.body;
    const newTodo = {
        id: todos.length + 1,
        title,
        completed: false
    }
    todos.push(newTodo);
    res.json(newTodo);
})

app.put("/todos/:id", (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;
    const todo = todos.find(todo => todo.id === parseInt(id));
    todo.title = title;
    todo.completed = completed;
    res.json(todo);
})

app.delete("/todos/:id", (req, res) => {
    const { id } = req.params;
    const todo = todos.find(todo => todo.id === parseInt(id));
    const index = todos.indexOf(todo);
    todos.splice(index, 1);
    res.json(todo);
})