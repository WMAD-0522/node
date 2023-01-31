import express from 'express';
import employeeController from '../controllers/employee.controller.js';

const router = express.Router();

// create employee
router.post("/", employeeController.create);

// find all employees
router.get('/', employeeController.findAll);

// find one employee by id
router.get("/:id", employeeController.findById);

// update one employee by id
router.put("/:id", employeeController.updateById);

// delete one employee by id
router.delete("/:id", employeeController.deleteById);

// delete all employees
router.delete("/", employeeController.deleteAll);

export default router;