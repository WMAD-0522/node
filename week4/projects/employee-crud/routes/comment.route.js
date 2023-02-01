import express from 'express';
import commentController from '../controllers/comment.controller.js';

const router = express.Router();

router.post('/', commentController.createComment);
router.get('/', commentController.findAllComments);
router.delete('/:id', commentController.deleteCommentById);

export default router;