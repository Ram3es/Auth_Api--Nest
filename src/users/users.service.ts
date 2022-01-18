import { RolesService } from './../roles/roles.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './users.model'
import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    constructor(@InjectModel(Users) private usersModel: typeof Users,
                private rolesService: RolesService ){}

    async createUser(dto: CreateUserDto){
        const user = await this.usersModel.create(dto)
        const role = await this.rolesService.getRoleByValue("USER")

        await user.$set("roles", [role.id])
        user.roles = [role]
        console.log(user);
        
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
    async remove(id: string){
        const user =  await this.usersModel.findOne({where:{id}, include:{all:true}})
        await user.destroy()
        return user
        
    }
}
