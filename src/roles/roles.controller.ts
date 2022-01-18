import { RolesService } from './roles.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-roles.dto';

@Controller('roles')
export class RolesController {
    constructor(private rolesService: RolesService){}
    @Post()
     createRole(@Body() createDto: CreateRoleDto){
         return this.rolesService.createRole(createDto)
     }
     @Get(":value")
      getRole(@Param("value") value: string){
          return this.rolesService.getRoleByValue(value)
      }
}
