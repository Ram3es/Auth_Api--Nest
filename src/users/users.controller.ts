import { RolesGuard } from './../auth/roles.guard';
import { Users } from './users.model';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger"
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { Roles } from 'src/auth/decoratorCustom/auth-roles.decorator';


@ApiTags("USERS")
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}
    @ApiOperation({summary:"Create User"})
    @ApiResponse({status: 201, type: Users})
    @Post()
    create(@Body() userDto: CreateUserDto){
        return this.usersService.createUser(userDto)
    }
    @ApiOperation({summary:"Get all users"})
    @ApiResponse({status: 200, type: [Users]})
    // @UseGuards(JwtAuthGuard)
    @Roles("USER")
    @UseGuards(RolesGuard)
    @Get()
    getAllUsers(){
        return this.usersService.getAllUsers()
    }
    @Delete(":id")
        deleteUser(@Param("id") id: string ){
            return this.usersService.remove(id)
        }
    }



