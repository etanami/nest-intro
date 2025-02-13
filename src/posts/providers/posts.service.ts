import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
//import { MetaOption } from 'src/meta-options/meta-option.entity';
import { CreatePostDto } from '../dtos/create-post.dto';
import { MetaOptionsService } from 'src/meta-options/providers/meta-options.service';

/**
 * Class to connect and perform posts operations
 */
@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly metaOptionsService: MetaOptionsService,

    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,

    // @InjectRepository(MetaOption)
    // public readonly metaOptionsRepository: Repository<MetaOption>,
  ) {}

  /** Function to create a new post */
  public async create(createPostDto: CreatePostDto) {
    // find author from db
    const author = await this.usersService.findOneById(createPostDto.authorId);

    // create post by author
    const post = this.postsRepository.create({
      ...createPostDto,
      author,
    });

    return await this.postsRepository.save(post);
  }

  /** Function to get all posts by a particular user */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async findAll(userId: number) {
    // to-do

    const posts = await this.postsRepository.find({
      relations: {
        metaOptions: true,
      },
    });

    return await this.postsRepository.save(posts);
  }

  public async delete(id: number) {
    // Delete post
    await this.postsRepository.delete({ id });

    return { id, deleted: true };
  }
}
