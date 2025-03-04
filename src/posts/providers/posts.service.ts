import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
//import { MetaOption } from 'src/meta-options/meta-option.entity';
import { CreatePostDto } from '../dtos/create-post.dto';
import { MetaOptionsService } from 'src/meta-options/providers/meta-options.service';
import { TagsService } from 'src/tags/providers/tags.service';
import { PatchPostDto } from '../dtos/patch-post.dto';
import { GetPostsDto } from '../dtos/get-posts.dto';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { ActiveUserData } from 'src/auth/interfaces/active-user.interface';
import { CreatePostProvider } from './create-post.provider';

/**
 * Class to connect and perform posts operations
 */
@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly metaOptionsService: MetaOptionsService,
    private readonly tagsService: TagsService,

    // Inject postsRepository
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,

    // Inject paginationProvider
    private readonly paginationProvider: PaginationProvider,

    // Inject createPostProvider
    private readonly createPostProvider: CreatePostProvider,
  ) {}

  /** Function to create a new post */
  public async create(createPostDto: CreatePostDto, user: ActiveUserData) {
    return await this.createPostProvider.create(createPostDto, user);
  }

  /** Function to get all posts by a particular user */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async findAll(
    postQuery: GetPostsDto,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    userId: number,
  ): Promise<Paginated<Post>> {
    // to-do

    const posts = await this.paginationProvider.paginateQuery(
      {
        limit: postQuery.limit,
        page: postQuery.page,
      },
      this.postsRepository,
    );

    return posts;
  }

  /** Function to update a post and the new tags */
  public async update(patchPostDto: PatchPostDto) {
    // find tags
    const tags = await this.tagsService.getMultipleTags(patchPostDto.tags);

    // find post
    const post = await this.postsRepository.findOneBy({
      id: patchPostDto.id,
    });

    // update the post properties
    post.title = patchPostDto.title ?? post.title;
    post.postType = patchPostDto.postType ?? post.postType;
    post.slug = patchPostDto.slug ?? post.slug;
    post.status = patchPostDto.status ?? post.status;
    post.content = patchPostDto.content ?? post.content;
    post.featuredImageUrl =
      patchPostDto.featuredImageUrl ?? post.featuredImageUrl;
    post.publishOn = patchPostDto.publishOn ?? post.publishOn;

    // assign the new tags
    post.tags = tags;

    // return and update the post
    return await this.postsRepository.save(post);
  }

  public async delete(id: number) {
    // Delete post
    await this.postsRepository.delete({ id });

    return { id, deleted: true };
  }
}
