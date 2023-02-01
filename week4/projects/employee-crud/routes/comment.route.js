import express from "express";
import commentController from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/", commentController.createComment);

router.get("/", commentController.getComments);

// router.get("/:id", commentController.getCommentsById);

export default router;