import employee from "../models/employee.model.js";
import db from "../models/index.js";
// import { Op } from "sequelize";

const employeeController = {};

const createEmployee = (req, res) => {
    // Validate request

    if(!req.body.fullName) {
        res.status(400).send({
            message: "Full name cannot be empty!"
        })
        return;
    }

    const employee = {
        fullName: req.body.fullName,
        email: req.body.email,
        department: req.body.department,
        salary: req.body.salary,
        overTime: req.body.overTime
    };

    db.employees.create(employee)
        .then(data => {
            // res.send(data);
            res.status(201).send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating the Employee record"
            });
        });
};

const findAllEmployees = (req, res) => {
    db.employees.findAll()
        .then(data => {
            // res.status(200).send(data);
            res.render("pages/home", { employees: data })
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving the Employees"
            });
        })
};

const findOneEmployeeById = (req, res) => {
    const id = req.params.id;

    db.employees.findByPk(id)
        .then(data => {
            if(data) {
                res.status(200).send(data)
            }else{
                res.status(404).send({
                    message: `Cannot find Employee using id=${id}`
                })
            }
        }).catch(err => {
            res.status(500).send({
                message: err.message || `Some error occured while retrieving Employee using id=${id}`
            });
        });
}

const updateEmployeeById = (req, res) =>  {
    const id = req.params.id;

    db.employees.update(req.body, {
        where: { id: id }
    }).then(data => {
        if(data == 1){
           res.status(200).json({
                message: `Employee where id is ${id} successfully updated!`
           });
        }else{
            res.send({
                message: `Cannot update Employee using id=${id}.`
            })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || `Some error occured while update Employee using id=${id}`
        })
    })

}

const deleteEmployeeById = (req, res) => {
    const id = req.params.id;

    db.employees.destroy({
        where: { id: id }
    }).then(data => {
        if(data == 1){
            res.status(200).json({
                message: `Employee id is ${id} deleted successfully!`
            })
        }else{
            res.send({
                message: `Cannot deleted Employee using id=${id}.`
            })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || `Some error occured while delete Employee using id=${id}`
        })
    })
}

const deleteAllEmployee = (req, res) => {
    db.employees.destroy({
        where: {}
    }).then(data => {
        res.status(200).json({
            message: `All Employees are deleted successfully!`
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message || `Some error occured while delete all Employee`
        })
    })
}

employeeController.create = createEmployee;
employeeController.findAll = findAllEmployees;
employeeController.findById = findOneEmployeeById;
employeeController.updateById = updateEmployeeById;
employeeController.deleteById = deleteEmployeeById;
employeeController.deleteAll = deleteAllEmployee;

export default employeeController;