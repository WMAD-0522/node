import Sequelize from "sequelize";
import dbConfig from "../config/db.config.js";
import employeeModel from "./employee.model.js";

const sequelize = new Sequelize(
    dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    // operatorsAliases: false will disable the deprecated operatorsAliases
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db =  {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.employees = employeeModel(sequelize, Sequelize);

export default db;