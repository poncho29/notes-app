import { Router } from 'express';

import { authMiddleware } from '../middlewares';

import authRouter from './auth.route';
import noteRouter from './note.route';

const router = Router();

router.use('/auth', authRouter);
router.use('/note', authMiddleware, noteRouter);

export default router;
