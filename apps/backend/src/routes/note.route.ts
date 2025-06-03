import { Router, Request, Response } from 'express';

import { checkSchema, validationResult } from 'express-validator';

import { createNoteSchema, updateNoteSchema, validIdSchema } from '../schemas';

import { create, findAll, findOne, remove, update } from '../controllers';

const noteRouter = Router();

noteRouter.post('/', checkSchema(createNoteSchema), (req: Request, res: Response) => {
  const result = validationResult(req);
  
  if (!result.isEmpty()) {
    res.status(400).json({ errors: result.array() });
    return;
  }

  create(req, res);
});

noteRouter.get('/', findAll);

noteRouter.get('/:id', checkSchema(validIdSchema), (req: Request, res: Response) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    res.status(400).json({ errors: result.array() });
    return;
  }

  findOne(req, res);
});

noteRouter.put('/:id',  checkSchema(updateNoteSchema), (req: Request, res: Response) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    res.status(400).json({ errors: result.array() });
    return;
  }

  update(req, res);
});

noteRouter.delete('/:id', checkSchema(validIdSchema), (req: Request, res: Response) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    res.status(400).json({ errors: result.array() });
    return;
  }

  remove(req, res);
});

export default noteRouter;