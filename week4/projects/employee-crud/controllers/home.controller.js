import db from "../models/index.js";
const homeController = {};

const getHomePage = (req, res) => {

    let colorSchema = [
        "primary", "secondary", "success", "danger", "warning", "info", "light", "dark"
    ];

    let departments = [];
    let comments = [];
    let employees = [];

    employees = db.employees.findAll().then(data => data);
    comments = db.comments.findAll({
        include: [
            {
                model: db.employees,
                as: "employee",
            }
        ]
    }).then(data => data);
    departments = db.departments.findAll().then(data => data);

    Promise.all([employees, comments, departments]).then(values => {
        res.render("pages/home", 
        { 
            title: "Home", 
            employees: values[0], 
            departments: values[2], 
            comments: values[1],
            colorSchema: colorSchema
        });
    }).catch(err => {
        console.log(err);
    })

}

const getEmployeePage = (req, res) => {

    let employees = [];
    let departments = [];

    employees = db.employees.findAll().then(data => data);
    departments = db.departments.findAll().then(data => data);

    Promise.all([employees, departments]).then(values => {
        res.render("pages/employee", { title: "Employee", employees: values[0], departments: values[1] });
    }).catch(err => {
        console.log(err);
    });       

}

const getDepartmentPage = (req, res) => {

    let department = [];

    department = db.departments.findAll().then(data => data);

    Promise.all([department]).then(values => {
        res.render("pages/department", { title: "Department", departments: values[0] });
    })
}

const getEmployeeProfilePage = (req, res) => {
    
    let id = req.params.id;

    let employee = [];

    employee = db.employees.findByPk(id, {
        include: [{
            model: db.comments,
            as: "comments",
        },
        {
            model: db.departments,
            as: "department",
        }]
    }).then(data => data);

    Promise.all([employee]).then(values => {
        console.log(values[0]);
        res.render("pages/profile", { title: "Profile", employee: values[0] });
    }).catch(err => {
        console.log(err);
    });

};

homeController.getHomePage = getHomePage;
homeController.getEmployeePage = getEmployeePage;
homeController.getDepartmentPage = getDepartmentPage;
homeController.getEmployeeProfilePage = getEmployeeProfilePage;

export default homeController;