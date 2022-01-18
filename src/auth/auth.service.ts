import { CreateUserDto } from './../users/dto/create-user.dto';
import { UsersService } from './../users/users.service';
import { Users } from 'src/users/users.model';

import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcryptjs"


@Injectable()
export class AuthService {
    constructor(private usersService: UsersService,
                private jwtService: JwtService){}

    async login( userDto: CreateUserDto){ 
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }
    async registration(  { email, password } : CreateUserDto){
        const candidate = await this.usersService.getUserByEmail(email)
        if(candidate){
            throw new HttpException(" User already exist", HttpStatus.BAD_REQUEST)
        }
        const hashPass = await bcrypt.hash(password, 5)
        const user = await this.usersService.createUser({email,password: hashPass})
        return this.generateToken(user)
    }
     private generateToken( {email, id, roles }: Users ){
         const payload ={ email, id, roles}
        return {
            token: this.jwtService.sign(payload)
        }
     }
     private async validateUser( dto: CreateUserDto ){
        const userExist = await this.usersService.getUserByEmail(dto.email)
        const matchPassword = await bcrypt.compare(dto.password,userExist.password)

        if(userExist && matchPassword){
            return userExist
        }
        throw new UnauthorizedException({message:"Incorrect email or password"})
     }
    }

        

