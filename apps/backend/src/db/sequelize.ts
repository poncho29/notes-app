import { Sequelize } from 'sequelize-typescript'
import 'dotenv/config'

import { User } from '../models/user.model'
import { Note } from '../models/note.model'

export const sequelize = new Sequelize(
  process.env.DB_NAME || '',
  process.env.DB_USER || '',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    dialect: 'mysql',
    logging: false,
    models: [User, Note],
  }
);
