import { Roles } from './roles.model';
import { Users } from './../users/users.model';
import { Table, Model, Column, DataType,  ForeignKey } from "sequelize-typescript";



@Table({tableName:"user_roles", createdAt: false, updatedAt: false})
export class UserRoles extends Model<UserRoles>{
  
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ForeignKey(() => Roles)
    @Column({type: DataType.INTEGER})
    roleId: number

    @ForeignKey(() => Users)
    @Column({type: DataType.INTEGER,})
    userId: number

  

}