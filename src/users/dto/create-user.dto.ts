import { ApiProperty } from "@nestjs/swagger"
import { IsString ,IsEmail, Length} from "class-validator"


export class CreateUserDto{
    @ApiProperty({example:"qwe-qwe@mail.com", description:" User`s email"})
    @IsString({message:"Should be a String!"})
    @IsEmail({}, {message: "Uncorrect Email"})
    readonly email: string
    @ApiProperty({example:"12345678", description:" Password "})
    @IsString({message:"Should be a String!"})
    @Length(4,16, {message: "Should be min 4 max 16"})
    readonly password: string

}