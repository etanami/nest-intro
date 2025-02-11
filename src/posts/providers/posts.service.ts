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
    // create post
    const post = this.postsRepository.create(createPostDto);

    return await this.postsRepository.save(post);
  }

  /** Function to get all posts by a particular user */
  public async findAll(userId: string) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const user = this.usersService.findOneById(userId);

    const posts = await this.postsRepository.find({
      relations: {
        metaOptions: true,
      },
    });

    return await this.postsRepository.save(posts);
  }
}
