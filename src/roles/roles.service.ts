import { Roles } from 'src/roles/roles.model';
import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-roles.dto';

@Injectable()
export class RolesService {
    constructor(@InjectModel(Roles) private rolesModel: typeof Roles){}
    

   async createRole(dto: CreateRoleDto){
       const role = await this.rolesModel.create(dto)
       return role
   }
   async getRoleByValue(role: string){
       const userRole = await this.rolesModel.findOne({where: {role}})
       return userRole

   }
}
