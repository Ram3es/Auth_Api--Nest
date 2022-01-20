import { IsNumber, IsString } from "class-validator"

export class AddRoleDto{
    @IsString({message: "Have to string"})
    readonly value: string
    @IsNumber({}, {message: "Have to number"})
    readonly userId: number 
}