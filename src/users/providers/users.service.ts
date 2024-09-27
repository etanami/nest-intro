/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { GetUserParamDto } from '../dtos/get-user-param.dto';

@Injectable()
export class UsersService {
  public findAll(
    getUserParamDto: GetUserParamDto,
    limit: number,
    page: number,
  ) {
    return [
      {
        firstName: 'John',
        email: 'john@doe.com',
      },
      {
        firstName: 'Alice',
        email: 'alice@doe.com',
      },
    ];
  }

  public findOneById(id: string) {
    return {
      id,
      firstName: 'Alice',
      email: 'alice@doe.com',
    };
  }
}
