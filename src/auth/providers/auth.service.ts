import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  public isAuthenticated() {
    return true;
  }

  public login(email: string, password: string, id: string) {
    // check if user exists
    const user = this.usersService.findOneById(id);

    if (!user) {
      return "User doesn't exist";
    } else {
      return 'USER_TOKEN';
    }
  }
}
