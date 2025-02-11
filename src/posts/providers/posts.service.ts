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
    // create metaOption
    const metaOptions = createPostDto.metaOptions
      ? await this.metaOptionsService.create(createPostDto.metaOptions)
      : null;

    // create post
    const post = this.postsRepository.create(createPostDto);

    // add metaOptions to the post
    if (metaOptions) {
      post.metaOptions = metaOptions;
    }

    return await this.postsRepository.save(post);
  }

  /** Function to get all posts by a particular user */
  public findAll(userId: string) {
    const user = this.usersService.findOneById(userId);

    return [
      {
        userId: user,
        title: 'Post 1',
        content: 'Content of post 1',
      },
      {
        userId: user,
        title: 'Post 2',
        content: 'Content of post 2',
      },
    ];
  }
}
