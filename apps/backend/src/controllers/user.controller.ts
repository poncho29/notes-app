import { Request, Response } from 'express';

import { User } from '../models/user.model';

export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: 'Usuario no autenticado' });
      return;
    }

    const user = await User.findByPk(userId, {
      attributes: ['id', 'email', 'name']
    });

    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}