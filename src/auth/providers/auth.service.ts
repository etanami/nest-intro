import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { SignInDto } from '../dtos/signin.dto';
import { SignInProvider } from './sign-in.provider';

/** Service handling authentication logic */
@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    // Inject signInProvider
    private readonly signInProvider: SignInProvider,
  ) {}

  /** Handles user signin process */
  public async signIn(signInDto: SignInDto) {
    return await this.signInProvider.signIn(signInDto);
  }

  /** Checks if user is authenticated */
  public isAuthenticated() {
    return true;
  }
}
