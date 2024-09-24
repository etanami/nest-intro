import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Ip,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
  @Get('/:id?')
  public getUsers(
    @Param('id', ParseIntPipe) id: number | undefined,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    console.log(limit);
    console.log(page);
    return 'This is the users controller';
  }

  @Post()
  public createUser(@Body() createUserDto: CreateUserDto, @Ip() ip: any) {
    console.log(createUserDto);
    console.log(ip);
    return 'User created successfully';
  }
}
