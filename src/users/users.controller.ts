import { BanUserDto } from './dto/ban-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { RolesGuard } from './../auth/roles.guard';
import { Users } from './users.model';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger"
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { Roles } from 'src/auth/decoratorCustom/auth-roles.decorator';


@ApiTags("USERS")
//@Roles("USER")
@UseGuards(RolesGuard)
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
    @Get()
    getAllUsers(){
        return this.usersService.getAllUsers()
    }
    @ApiOperation({summary:"Add Role"})
    @ApiResponse({status: 200, type: [Users]})
    @Roles("ADMIN")
    @Post("role")
    addRole(@Body() addRoleDto: AddRoleDto){
        return this.usersService.addRole(addRoleDto)
    }
    @ApiOperation({summary:"Banned User"})
    @ApiResponse({status: 200, type: [Users]})
    @Roles("ADMIN")
    @Post("ban")
    ban(@Body() banUserDto: BanUserDto){
        return this.usersService.ban(banUserDto)
    }
    @Roles("ADMIN")
    @Delete(":id")
        deleteUser(@Param("id") id: string ){
            return this.usersService.remove(id)
        }
    }



