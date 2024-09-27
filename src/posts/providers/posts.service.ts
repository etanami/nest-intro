import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class PostsService {
  constructor(private readonly usersService: UsersService) {}

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
