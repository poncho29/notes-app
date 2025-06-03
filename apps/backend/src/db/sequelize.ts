import { Sequelize } from 'sequelize-typescript'
import 'dotenv/config'

import { User } from '../models/user.model'
import { Note } from '../models/note.model'

const DATABASE_URL = process.env.DATABASE_URL || ''
console.log(`Database URL ${DATABASE_URL}`)

export const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  models: [User, Note],
  logging: false,
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  },
})
