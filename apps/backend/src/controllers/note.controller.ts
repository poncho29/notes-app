import { Request, Response } from 'express';

import { Note } from '../models/note.model';
import { User } from '../models/user.model';

export const create = async (req: Request, res: Response) => {
  try {
    const { userId, ...rest } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }

    const body = { ...rest, userId };

    const note = await Note.create({ 
      ...body,
      user: userId ? user : undefined
    });

    res.status(201).json({ note, message: 'Nota creada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la nota' });
  }
}

export const findAll = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    
    if (!user) {
      res.status(401).json({ message: 'Usuario no autenticado' });
      return;
    }

    const userId = user.id;

    const note = await Note.findAll({ where: { userId } });
    res.status(200).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los productos' });
  }
}

export const findOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const note = await Note.findByPk(id);
    
    if (!note) {
      res.status(404).json({ message: 'Nota no encontrado' });
      return;
    }

    res.status(200).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la nota' });
  }
}

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId, ...rest } = req.body;

    const note = await Note.findByPk(id);
    
    if (!note) {
      res.status(404).json({ message: 'Nota no encontrada' });
      return;
    }

    Object.assign(note, rest);
    await note.save();

    res.status(200).json({ note, message: 'Nota actualizada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la nota' });
  }
}

export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const note = await Note.findByPk(id);
    
    if (!note) {
      res.status(404).json({ message: 'Nota no encontrado' });
      return;
    }

    await note.destroy();

    res.status(200).json({ message: 'Nota eliminada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la nota' });
  }
}