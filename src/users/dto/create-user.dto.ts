import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDto{
    @ApiProperty({example:"qwe-qwe@mail.com", description:" User`s email"})
    readonly email: string
    @ApiProperty({example:"12345678", description:" Password "})
    readonly password: string

}