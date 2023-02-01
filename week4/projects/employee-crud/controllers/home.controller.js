import db from "../models/index.js";

const homeController = {};

const getHome = (req, res) => {

    let colorSchema = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark'];

    let employees = [];
    let comments = [];
    let departments = [];

    employees = db.employees.findAll().then(data => data);

    // add employee to comments
    comments = db.comments.findAll({
        include: [{
            model: db.employees,
            as: "employee"
        }]
    }).then(data => data);

    departments = db.department.findAll().then(data => data);


    Promise.all([employees, comments, departments]).then(values => {
        console.log(values[1]);
        res.render("pages/home", { title: "Home", employees: values[0], comments: values[1], departments: values[2], colorSchema: colorSchema });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while retrieving the Employees"
        });
    });

};

const getDepartment = (req, res) => {
    let departments = [];

    departments = db.department.findAll().then(data => data);

    Promise.all([departments]).then(values => {
        res.render("pages/department", { title: "Department", departments: values[0] });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while retrieving the Departments"
        });
    });
};

const getEmployee = (req, res) => {
    let employees = [];
    let departments = [];

    employees = db.employees.findAll().then(data => data);
    departments = db.department.findAll().then(data => data);

    Promise.all([employees, departments]).then(values => {
        res.render("pages/employee", { title: "Employee", employees: values[0], departments: values[1] });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while retrieving the Employees"
        });
    });
};

homeController.getEmployee = getEmployee;
homeController.getDepartment = getDepartment;
homeController.getHome = getHome;

export default homeController;