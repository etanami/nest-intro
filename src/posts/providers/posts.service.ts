import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

/**
 * Class to connect and perform posts operations
 */
@Injectable()
export class PostsService {
  constructor(private readonly usersService: UsersService) {}

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

  /** Function to create a new post */
  public createPost() {}
}
