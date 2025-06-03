import { Request, Response, Router } from 'express';
import { checkSchema, validationResult } from 'express-validator';

import { loginSchema, registerSchema } from '../schemas';

import { login, register } from '../controllers';

const router = Router();

router.post('/login', checkSchema(loginSchema), (req: Request, res: Response) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    res.status(400).json({ errors: result.array() });
    return;
  }

  login(req, res);
});

router.post('/register', checkSchema(registerSchema), (req: Request, res: Response) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    res.status(400).json({ errors: result.array() });
    return;
  }

  register(req, res);
});

export default router;