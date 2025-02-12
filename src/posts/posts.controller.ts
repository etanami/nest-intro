import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from 'src/posts/dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';

/** Controller for managing blog posts */
@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  /** Retrieves posts for a specific user */
  @Get('/:userId?')
  public getPosts(@Param('userId') userId: string) {
    return this.postsService.findAll(userId);
  }

  /** Creates a new post */
  @Post()
  public createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  /** Updates an existing post */
  @Patch()
  public patchPost(@Body() patchPostDto: PatchPostDto) {
    console.log(patchPostDto);
  }

  @Delete()
  public deletePost(@Query('id', ParseIntPipe) id: number) {
    return this.postsService.delete(id);
  }
}
