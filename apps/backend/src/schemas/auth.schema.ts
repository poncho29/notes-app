import { Schema } from "express-validator";

export const loginSchema: Schema = {
  email: {
    in: ['body'],
    isEmail: {
      errorMessage: 'El email debe ser una dirección de correo electrónico válida',
    },
    notEmpty: {
      errorMessage: 'El email es obligatorio',
    },
    trim: true,
    escape: true,
  },
  password: {
    in: ['body'],
    isString: {
      errorMessage: 'La contraseña debe ser una cadena de texto',
    },
    notEmpty: {
      errorMessage: 'La contraseña es obligatoria',
    },
    trim: true,
    escape: true,
  },
}

export const registerSchema: Schema = {
  name: {
    in: ['body'],
    isString: {
      errorMessage: 'El nombre debe ser una cadena de texto',
    },
    notEmpty: {
      errorMessage: 'El nombre es obligatorio',
    },
    trim: true,
    escape: true,
  },
  email: {
    in: ['body'],
    isEmail: {
      errorMessage: 'El email debe ser una dirección de correo electrónico válida',
    },
    notEmpty: {
      errorMessage: 'El email es obligatorio',
    },
    trim: true,
    escape: true,
  },
  password: {
    in: ['body'],
    isString: {
      errorMessage: 'La contraseña debe ser una cadena de texto',
    },
    notEmpty: {
      errorMessage: 'La contraseña es obligatoria',
    },
    trim: true,
    escape: true,
  },
}
