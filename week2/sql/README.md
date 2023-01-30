### SQL

CRUD = Create, Read, Update, Delete

SQL (Structured Query Language) is a programming language used to manage and manipulate relational databases.

Here are some basic SQL commands to get you started:

SELECT - used to select data from a database
INSERT - used to insert data into a table
UPDATE - used to update data in a table
DELETE - used to delete data from a table
WHERE - used to filter data based on specified conditions
JOIN - used to combine data from multiple tables
For example, to select all data from a table called "users", you would use the following query:

```sql
CREATE TABLE users (
  user_id INT PRIMARY KEY,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255),
  city VARCHAR(255)
);

INSERT INTO users (user_id, first_name, last_name, email, city) VALUES
  (1, 'John', 'Doe', 'johndoe@example.com', 'New York'),
  (2, 'Jane', 'Doe', 'janedoe@example.com', 'New York'),
  (3, 'Bob', 'Smith', 'bobsmith@example.com', 'Chicago'),
  (4, 'Alice', 'Johnson', 'alicejohnson@example.com', 'Chicago'),
  (5, 'Charlie', 'Brown', 'charliebrown@example.com', 'Los Angeles');
```

```sql
CREATE TABLE orders (
  order_id INT PRIMARY KEY,
  user_id INT,
  product VARCHAR(255),
  price DECIMAL(10, 2),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

INSERT INTO orders (order_id, user_id, product, price) VALUES
  (1, 1, 'book', '20.99'),
  (2, 2, 'book', '20.99'),
  (3, 3, 'book', '20.99'),
  (4, 4, 'book', '20.99'),
  (5, 5, 'book', '20.99');
```


```sql
SELECT * FROM users;
```

To insert data into the "users" table, you would use the following query:

```sql
INSERT INTO users (column1, column2, column3) VALUES (value1, value2, value3);
```

To update data in the "users" table, you would use the following query:

```sql
UPDATE users SET column1 = new_value WHERE some_column = some_value;
```

To delete data from the "users" table, you would use the following query:

```sql
DELETE FROM users WHERE some_column = some_value;
```

Please keep in mind that these are just a few examples of the many SQL commands available.

- GROUP BY - used to group rows in a result set based on one or more columns.
- HAVING - used in conjunction with GROUP BY to filter groups based on a specified condition.
- ORDER BY - used to sort the result set in ascending or descending order.
- LIMIT - used to limit the number of rows returned in a result set.
- INNER JOIN - used to retrieve rows from two or more tables where there is at least one matching row in both tables.
- OUTER JOIN - used to retrieve all rows from one table and the matching rows from another table. If there is no match, - - NULL values will be returned.
- SUBQUERY - used to include the results of one query within another query.
- UNION - used to combine the results of two or more queries into a single result set.
For example, to retrieve all users from the "users" table and group them by the "city" column, you would use the following query:

```sql
SELECT city, count(*) FROM users GROUP BY city;
```

To retrieve all users from the "users" table and join it with the "orders" table on the "user_id" column, you would use the following query:

```sql
SELECT users.*, orders.* FROM users INNER JOIN orders ON users.user_id = orders.user_id;
```

To retrieve all users from the "users" table and sort the result set by the "last_name" column in descending order, you would use the following query:

```sql
SELECT * FROM users ORDER BY last_name DESC

DESC = descending
ASC = ascending
```
