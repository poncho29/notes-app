import { Schema } from "express-validator";

export const validIdSchema: Schema = {
  id: {
    in: ['params'],
    trim: true,
    isUUID: {
      errorMessage: 'El id debe ser un UUID',
    },
    notEmpty: {
      errorMessage: 'El id es requerido',
    }
  },
}

export const createNoteSchema: Schema = {
  userId: {
    in: ['body'],
    trim: true,
    isUUID: {
      errorMessage: 'El id del usuario debe ser un UUID',
    },
    notEmpty: {
      errorMessage: 'El id del usuario es requerido',
    },
  },
  title: {
    in: ['body'],
    trim: true,
    isString: {
      errorMessage: 'El título de la nota debe ser un texto',
    },
    escape: true,
  },
  content: {
    in: ['body'],
    trim: true,
    isString: {
      errorMessage: 'El contenido de la nota debe ser un texto',
    },
    escape: true,
  },
}

export const updateNoteSchema: Schema = {
  id: {
    in: ['params'],
    trim: true,
    isUUID: {
      errorMessage: 'El id de la nota debe ser un UUID',
    },
    notEmpty: {
      errorMessage: 'El id de la nota es requerido',
    },
  },
  title: {
    in: ['body'],
    trim: true,
    optional: true,
    isString: {
      errorMessage: 'El título de la nota debe ser un texto',
    },
    escape: true,
  },
  content: {
    in: ['body'],
    trim: true,
    optional: true,
    isString: {
      errorMessage: 'El contenido de la nota debe ser un texto',
    },
    escape: true,
  },
}