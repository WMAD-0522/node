import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize(
    'loginapp',
    'root',
    'password',
     {
       host: 'localhost',
       dialect: 'mysql'
     }
);

sequelize.authenticate().then(() => {
  // authentication for database connection
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });


const User = sequelize.define("users", {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
 });

 sequelize.sync().then(() => {
    console.log('User table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });

export default User;