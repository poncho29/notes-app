import { Table, Column, Model, PrimaryKey, Default, Unique, DataType, HasMany } from 'sequelize-typescript'

import { Note } from './note.model'

@Table({ tableName: 'users', timestamps: true })
export class User extends Model<User> {
  
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string

  @Unique
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string

  @HasMany(() => Note)
  notes?: Note[]
}
