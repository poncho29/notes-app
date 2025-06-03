import { Table, Column, Model, PrimaryKey, Default, Unique, DataType, HasMany } from 'sequelize-typescript'

import { Note } from './note.model'

@Table({ tableName: 'users', timestamps: true })
export class User extends Model<User> {
  
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  name!: string;

  @Unique
  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  })
  email!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string

  @HasMany(() => Note)
  notes?: Note[]
}
