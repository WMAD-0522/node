import express from 'express';

import { me } from '../controllers/user.controller.js';

import auth from '../middleware/auth.middleware.js';

const router = express.Router();

// TODO: PUT update user information
// TODO: GET /me to get authenticated user information

router.get('/me',auth, me);
// router.get('/', getUsers);
// router.get('/:id', getUser);
// router.put('/:id', updateUser);
// router.delete('/:id', deleteUser);

export default router;

