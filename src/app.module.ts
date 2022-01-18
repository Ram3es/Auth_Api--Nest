import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { UserRoles } from './roles/user-roles.model';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { Users } from './users/users.model';
import { RolesModule } from './roles/roles.module';
import { Roles } from './roles/roles.model';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';


@Module({
    controllers: [],
    // providers:[{
    //     provide: APP_GUARD,               global guards
    //     useClass: JwtAuthGuard
    // }],
    imports:[
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [Users, Roles, UserRoles],
            autoLoadModels: true
          }),
        UsersModule,
        RolesModule,
        AuthModule,
    ]
    
})
export class AppModule {}
