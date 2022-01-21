
import { ApiProperty } from "@nestjs/swagger";
import { Table, Model, Column, DataType, BelongsToMany, HasMany } from "sequelize-typescript";
import { Posts } from "src/post/post.model";
import { Roles } from "src/roles/roles.model";
import { UserRoles } from './../roles/user-roles.model';


interface UserCreationAttrs{
    email: string
    password: string
}

@Table({tableName:"users"})
export class   Users extends Model<Users,UserCreationAttrs>{
    @ApiProperty({example: 1, description:" Unique identificator"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example:"qwe-qwe@mail.com", description:" User`s email"})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string

    @ApiProperty({example:"12345678", description:" Password"})
    @Column({type: DataType.STRING,  allowNull: false})
    password: string

    @ApiProperty({example: true, description:" Banned or not"})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean
    
    @ApiProperty({example:"Banned", description:" Banned obscene language"})
    @Column({type: DataType.STRING})
    reasonBan: string

    @BelongsToMany(() => Roles, () => UserRoles)
    roles: Roles[]

    @HasMany(()=> Posts)
    post:Posts[]
}