import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

/** Service handling authentication logic */
@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  /** Checks if user is authenticated */
  public isAuthenticated() {
    return true;
  }

  /** Handles user login process */
  public login(email: string, password: string, id: number) {
    // check if user exists
    const user = this.usersService.findOneById(id);

    if (!user) {
      return "User doesn't exist";
    } else {
      return 'USER_TOKEN';
    }
  }
}
