import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get('/:id/:optional?')
  public getUsers(@Param() param: any, @Query() limit: any) {
    console.log(param);
    console.log(limit);
    return 'This is the users controller';
  }

  @Post()
  public createUser(@Body() request: any, @Ip() ip: any) {
    console.log(request);
    console.log(ip);
    return 'User created successfully';
  }
}
