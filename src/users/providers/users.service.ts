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

  public findOneById(id: number) {
    return {
      firstName: 'Alice',
      email: 'alice@doe.com',
    };
  }
}
