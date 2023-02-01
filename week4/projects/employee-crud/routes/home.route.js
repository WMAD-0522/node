import homeController from "../controllers/home.controller.js";
import express from "express";

const router = express.Router();

router.get("/", homeController.getHomePage);

router.get("/employee", homeController.getEmployeePage);

router.get("/department", homeController.getDepartmentPage);

router.get("/profile/:id", homeController.getEmployeeProfilePage);

export default router;