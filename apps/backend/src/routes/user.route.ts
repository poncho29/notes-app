import { Router } from 'express';

import { getUser } from '../controllers';

const userRouter = Router();

userRouter.get('/', getUser);

export default userRouter;



