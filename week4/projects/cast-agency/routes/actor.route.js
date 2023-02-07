import express from 'express';
import auth from "../middleware/auth.middleware.js";

import { getActors, getActor, addActor, updateActor, deleteActor } from '../controllers/actor.controller.js';

const router = express.Router();

router.get('/',auth, getActors);

router.get('/:id',auth, getActor);

router.post('/',auth, addActor);

router.put('/:id',auth, updateActor);

router.delete('/:id',auth, deleteActor);

export default router;
