import { UserRoles } from './user-roles.model';
import { Users } from './../users/users.model';
import { ApiProperty } from "@nestjs/swagger";
import { Table, Model, Column, DataType, BelongsToMany } from "sequelize-typescript";

interface RoleCreationAttrs{
    role: string
    description: string
}

@Table({tableName:"roles"})
export class Roles extends Model<Roles,RoleCreationAttrs>{
    @ApiProperty({example: 1, description:" Unique identificator"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example:"ADMIN", description:" Unique value role"})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    role: string

    @ApiProperty({example:"Administrator", description:" Description role"})
    @Column({type: DataType.STRING,})
    description: string

    @BelongsToMany(() => Users, () => UserRoles)
    users: Users[]

}