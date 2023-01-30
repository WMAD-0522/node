import mysql from "mysql";

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "product_db"
});

connection.connect((err) => {
    if(err) console.log(err);
    console.log("Connected to database");
})

export default connection;
