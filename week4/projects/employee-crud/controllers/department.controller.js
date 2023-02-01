import db from "../models/index.js";

const departmentController = {};

const createDepartment = (req, res) => {
    // Validate request

    if(!req.body.name) {
        res.status(400).send({
            message: "name cannot be empty!"
        })
        return;
    }

    const department = {
        name: req.body.name,
        description: req.body.description,
    };

    db.department.create(department)
        .then(data => {
            // res.send(data);
            // res.status(201).send(data);
            res.redirect("/department");
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating the Department record"
            });
        });
};

const findAllDepartments = (req, res) => {
    db.department.findAll({ include: ["employees"] })
        .then(data => {
            res.status(200).send(data);
            // res.render("pages/home", { departments: data })
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving the Departments"
            });
        })
};


departmentController.createDepartment = createDepartment;
departmentController.findAllDepartments = findAllDepartments;

export default departmentController;