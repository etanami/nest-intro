/* eslint-disable @typescript-eslint/no-unused-vars */
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetUserParamDto } from '../dtos/get-user-param.dto';
import { AuthService } from 'src/auth/providers/auth.service';

/**
 * Class to connect to users table and perform business operations
 */
@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  /** The method to get all the users from the database */
  public findAll(
    getUserParamDto: GetUserParamDto,
    limit: number,
    page: number,
  ) {
    const isAuth = this.authService.isAuthenticated();
    console.log(isAuth);

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

  /** Find a single user by the ID of the user */
  public findOneById(id: string) {
    return {
      id,
      firstName: 'Alice',
      email: 'alice@doe.com',
    };
  }
}
