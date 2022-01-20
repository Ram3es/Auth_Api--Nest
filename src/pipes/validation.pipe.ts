import {  ValidationExceptionCST } from './../exception/validation.exception';
import { ArgumentMetadata,  Injectable, PipeTransform } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator"



@Injectable()
export class ValidationPipeCustom implements PipeTransform<any>{
   async transform(value: any, metadata: ArgumentMetadata):Promise<any> {
        const obj = plainToClass(metadata.metatype, value)
        const errors = await validate(obj)
        if(errors.length){
            console.log(errors);
            
            const message = errors.map( err =>{
                return `${err.property} - ${Object.values(err.constraints).join(", ")}`  
            })
            throw new ValidationExceptionCST(message)
            
        }
        return value
    }
    
}