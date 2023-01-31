To run this application,

- First of all, you need to create a database called `employeedb`
- Then, npm install
- Then, create a .env file in the root directory of the project and add the following lines to it but `with your own credentials`

```env
PORT = 3001
HOST = localhost
DB_USER = root
PASSWORD = password
DB = employeedb
dialect = mysql
```

- Then, run `npm run dev` to start the server using nodemon
