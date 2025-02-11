import { Module } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { PostsController } from './posts.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { MetaOptionsModule } from 'src/meta-options/meta-options.module';

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [UsersModule, MetaOptionsModule, TypeOrmModule.forFeature([Post])],
})
export class PostsModule {}
