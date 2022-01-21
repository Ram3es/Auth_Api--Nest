import { FileService } from '../files/file.service';
import { Posts } from 'src/post/post.model';
import { CreatePostDto } from './dto/create-post.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class PostService {
    constructor(@InjectModel(Posts) private postModel: typeof Posts,
                private fileService: FileService){}

   async create( dto: CreatePostDto, image: any ){
       const fileName = await this.fileService.createFile(image)
        const post = await this.postModel.create( {...dto, image: fileName})
        return post
    }
} 
