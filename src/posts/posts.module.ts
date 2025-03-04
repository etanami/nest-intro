import { Module } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { PostsController } from './posts.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { MetaOptionsModule } from 'src/meta-options/meta-options.module';
import { TagsModule } from 'src/tags/tags.module';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { CreatePostProvider } from './providers/create-post.provider';

@Module({
  providers: [PostsService, CreatePostProvider],
  controllers: [PostsController],
  imports: [
    UsersModule,
    TagsModule,
    MetaOptionsModule,
    PaginationModule,
    TypeOrmModule.forFeature([Post]),
  ],
})
export class PostsModule {}
