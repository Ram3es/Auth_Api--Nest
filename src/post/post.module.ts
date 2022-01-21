import { FileModule } from '../files/file.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Posts } from './post.model';
import { Users } from 'src/users/users.model';

@Module({
  providers: [PostService],
  controllers: [PostController],
  imports:[SequelizeModule.forFeature([Posts, Users]),
  FileModule
]
  
})
export class PostModule {}
