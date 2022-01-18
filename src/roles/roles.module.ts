import { UserRoles } from './user-roles.model';
import { Users } from './../users/users.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Roles } from './roles.model';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports:[SequelizeModule.forFeature([Roles, Users, UserRoles])],
  exports:[RolesService]
})
export class RolesModule {}
