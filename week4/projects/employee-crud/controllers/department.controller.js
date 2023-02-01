import db from "../models/index.js";

const departmentController = {};

const createDepartment = (req, res) => {
    // validation
    if(!req.body.name && !req.body.description){
        res.status(400).send({
            message: "name and description is required"
        })
        return;
    }

    const department = {
        name: req.body.name,
        description: req.body.description
    };

    db.departments.create(department)
        .then(data => {
            res.redirect("/department");
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating department!"
            })
        })
};

const getAllDepartments = (req, res) => {
    db.departments.findAll({
        include: ["employees"]
    })
        .then(data => {
            res.status(200).send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while getting departments!"
            })
        })
};

departmentController.createDepartment = createDepartment;
departmentController.getAllDepartments = getAllDepartments;

export default departmentController;
