import { Router } from 'express';

// import { authMiddleware } from '../middlewares/auth';

import authRouter from './auth.route';

const router = Router();

router.use('/auth', authRouter);

export default router;
