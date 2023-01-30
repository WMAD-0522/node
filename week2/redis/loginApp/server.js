import express from 'express';
import ejs from 'ejs';
import redis from 'redis';
import bodyParser from 'body-parser';


const app = express();

const client = redis.createClient({
    host: '127.0.0.1',
    port: 6379
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/login', (req, res) => {
    res.render('pages/login');
});

app.post("/login", async (req, res) => {
    await client.connect();

    const { username, password } = req.body;
    const users = await client.get("users");
    if(users) {
        const usersArray = JSON.parse(users);
        const user = usersArray.find(user => user.username === username && user.password === password);
        if(user) {
            res.redirect('/list');
        }else{
            res.redirect('/login');
        }
    }else{
        res.redirect('/login');
    }

    await client.disconnect()
});

app.get("/register", (req, res) => {
    res.render('pages/register');
});

app.post("/register", async (req, res) => {
    await client.connect();

    const { username, password } = req.body;

    const users = await client.get("users");
    if(users) {
        const usersArray = JSON.parse(users);
        const user = usersArray.find(user => user.username === username);
        if(user) {
            res.redirect('/register');
        }else{
            usersArray.push({ username, password });
            await client.set("users", JSON.stringify(usersArray));
            res.redirect('/login');
        }
    }else{
        await client.set("users", JSON.stringify([{ username, password }]));
        res.redirect('/login');
    }

    await client.disconnect()
});

app.get("/list", async (req, res) => {
    await client.connect();

    const users = await client.get("users");
    if(users) {
        res.render('pages/list', { users: JSON.parse(users) });
    }else{
        res.render('pages/list', { users: [] });
    }

    await client.disconnect()
})


app.listen(3000, () => {
    console.log('Server running on port 3000');
});
