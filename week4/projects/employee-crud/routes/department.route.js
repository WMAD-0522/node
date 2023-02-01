import express from 'express';
import departmentController from '../controllers/department.controller.js';

const router = express.Router();

router.post('/', departmentController.createDepartment);
router.get('/', departmentController.findAllDepartments);

export default router;