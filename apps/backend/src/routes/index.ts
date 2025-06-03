import { Router } from 'express';

import { authMiddleware } from '../middlewares';

import authRouter from './auth.route';
import userRouter from './user.route';
import noteRouter from './note.route';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', authMiddleware, userRouter)
router.use('/note', authMiddleware, noteRouter);

export default router;
