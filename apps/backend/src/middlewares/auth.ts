import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { User } from '../models/user.model';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({ message: 'No se proporciono un token' });
      return;
    }

    const token = authHeader.split(' ')[1]; // Bearer TOKEN
    if (!token) {
      res.status(401).json({ message: 'No se proporciono un token' });
      return;
    }
    
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string, email: string };
    const user = await User.findByPk(decoded.id);

    if (!user) {
      res.status(401).json({ message: 'Usuario no encontrado' });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
};
