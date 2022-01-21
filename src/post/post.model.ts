import {BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";

import { Users } from "src/users/users.model";

interface PostCreationAttrs{
    title: string
    content: string 
    userId: number
    image: string
}

@Table({tableName:"posts"})
export class Posts extends Model<Posts,PostCreationAttrs>{
    @Column({type:DataType.INTEGER, unique: true ,primaryKey: true ,autoIncrement: true})
    id: number

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    title: string

    @Column({type: DataType.STRING, allowNull: false})
    content: string

    @Column({type: DataType.STRING})
    image: string

    @ForeignKey(()=> Users)
    @Column({ type: DataType.INTEGER} )
    userId: number

    @BelongsTo(() => Users)
    author: Users
}
