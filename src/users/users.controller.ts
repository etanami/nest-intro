import { Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  public getUsers() {
    return 'This is the users controller';
  }

  @Post()
  public createUser() {
    return 'User created successfully';
  }
}
