import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table({
  tableName: 'users',
  modelName: 'User',
  timestamps: true
})

class User extends Model {

  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
  declare id: string

  @Column({
    type: DataType.STRING
  })
  declare userName: string

  @Column({
    type: DataType.STRING
  })
  declare password: string

  @Column({
    type: DataType.STRING

  })
  declare email: string

  @Column({
    type: DataType.ENUM('Engineer', 'Coordinator', 'super-admin', 'ShiftEngineer'),
    defaultValue: 'Engineer'
  })
  declare role: string




}

export default User 