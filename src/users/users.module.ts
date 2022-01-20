import { RolesModule } from './../roles/roles.module';
import { UserRoles } from './../roles/user-roles.model';
import { Roles } from './../roles/roles.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Users } from './users.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [UsersService, AuthModule],
  controllers: [UsersController],
  imports:[SequelizeModule.forFeature([Users, Roles, UserRoles]),
  RolesModule,
  
  forwardRef(()=> AuthModule)
],
  exports:[UsersService]
 
})
export class UsersModule {}
