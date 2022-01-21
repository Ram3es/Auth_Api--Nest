import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
    constructor(private postService: PostService){}

    @Post()
    @UseInterceptors(FileInterceptor("image"))
    createPost(@Body() dtoCreatePost: CreatePostDto,
               @UploadedFile() image: any){
                   console.log(image," img controler");
                   
        return this.postService.create(dtoCreatePost,image)
    }
}
