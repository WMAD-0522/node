import express from 'express';
import auth from "../middleware/auth.middleware.js";

import { getAllCast, getCast, addCast, updateCast, deleteCast } from '../controllers/castagency.controller.js';

const router = express.Router();

router.get('/',auth, getAllCast);

router.get('/:id',auth, getCast);

router.post('/',auth, addCast);

router.put('/:id',auth, updateCast);

router.delete('/:id',auth, deleteCast);

export default router;