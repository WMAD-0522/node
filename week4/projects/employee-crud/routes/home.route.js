import express from 'express';
import homeController from '../controllers/home.controller.js';

const router = express.Router();

// get home page
router.get("/", homeController.getHome);

// get department page
router.get("/department", homeController.getDepartment);

// get employee page
router.get("/employee", homeController.getEmployee);

export default router;