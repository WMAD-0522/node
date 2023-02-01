import Sequelize from "sequelize";
import dbConfig from "../config/db.config.js";
import employeeModel from "./employee.model.js";
import departmentModel from "./department.model.js";
import commentModel from "./comment.model.js";

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
db.departments = departmentModel(sequelize, Sequelize);
db.comments = commentModel(sequelize, Sequelize);

db.employees.belongsTo(db.departments, {
    foreignKey: "departmentId",
    as: "department"
});
db.departments.hasMany(db.employees, {
    foreignKey: "departmentId",
    as: "employees"
});

db.comments.belongsTo(db.employees, {
    foreignKey: "employeeId",
    as: "employee"
});

db.employees.hasMany(db.comments, {
    foreignKey: "employeeId",
    as: "comments"
});

export default db;