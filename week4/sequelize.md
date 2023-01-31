Sequelize is a popular Node.js ORM (Object-Relational Mapping) library that makes it easy to interact with relational databases such as MySQL, PostgreSQL, and SQLite. With Sequelize, you can define your database schema using model definitions and then perform CRUD (Create, Read, Update, Delete) operations on your data.

Here are the basic steps to getting started with Sequelize:

```bash
npm install sequelize
```

Connect to your database: Before you can start using Sequelize, you need to connect to your database. You can do this by creating an instance of the Sequelize class and passing in your database connection details. For example:

```js
const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});
```

Define your models: In Sequelize, you define your database schema using models. A model is a class that defines the structure of a database table and the relationships between tables. For example:

```js
const Tutorial = sequelize.define('Tutorial', {
  title: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  }
});
```

Perform CRUD operations: Once you have defined your models, you can perform CRUD operations on your data. For example:

```js
// Create a new tutorial
Tutorial.create({
  title: 'Sequelize 101',
  description: 'A beginner\'s guide to Sequelize'
});

// Find all tutorials
Tutorial.findAll().then(tutorials => {
  console.log(tutorials);
});

// Update a tutorial
Tutorial.update({
  title: 'Sequelize 102'
}, {
  where: {
    id: 1
  }
});

// Delete a tutorial
Tutorial.destroy({
  where: {
    id: 1
  }
});
```
These are just a few basic examples of what you can do with Sequelize. There are many more advanced features, such as defining relationships between models, performing transactions, and working with associations. You can learn more about these features in the Sequelize documentation: http://docs.sequelizejs.com/manual/installation/getting-started.html