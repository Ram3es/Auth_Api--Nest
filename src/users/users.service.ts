import { BanUserDto } from './dto/ban-user.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { AddRoleDto } from './dto/add-role.dto';
import { RolesService } from './../roles/roles.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './users.model'
import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import * as bcrypt from"bcryptjs"

@Injectable()
export class UsersService {
    constructor(@InjectModel(Users) private usersModel: typeof Users,
                private rolesService: RolesService ){}

    async createUser(dto: CreateUserDto){
        const hashPass = await bcrypt.hash(dto.password, 5)
        const user = await this.usersModel.create({...dto, password: hashPass})
        const role = await this.rolesService.getRoleByValue("USER")
        
        await user.$set("roles", [role.id])
        user.roles = [role]
        
        return user
    }
    async getAllUsers(){
        const users = await this.usersModel.findAll({include:{all: true}}) // Подтягивает к запросу все связанные модели 
        return users
    }
    async getUserByEmail( email: string){
        const userExist = await this.usersModel.findOne({where:{email}, include:{all: true}})
        return userExist
    }
    async addRole( dto : AddRoleDto){
       const user = await this.usersModel.findByPk(dto.userId)
       const role = await this.rolesService.getRoleByValue( dto.value )
       if(user && role){
           user.$add("roles", role.id)
           return dto
       }
       throw new HttpException("User or role not found", HttpStatus.NOT_FOUND )
    } 
    async ban(dto: BanUserDto){
        const user = await this.usersModel.findByPk(dto.userId)
        if(!user){
            throw new HttpException("User or role not found", HttpStatus.NOT_FOUND )
        }
        user.banned = true
        user.reasonBan = dto.banReason
        user.save()
        return user
    }
    async remove(id: string){
        const user =  await this.usersModel.findOne({where:{id}, include:{all:true}})
        await user.destroy()
        return user
        
    }
}
