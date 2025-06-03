import { Table, Column, Model, PrimaryKey, Default, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript'

import { User } from './user.model'

@Table({ tableName: 'notes', timestamps: true })
export class Note extends Model<Note> {

  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content!: string

  @BelongsTo(() => User)
  user?: User
}
