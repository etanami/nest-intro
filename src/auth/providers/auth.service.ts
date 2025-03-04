import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { SignInDto } from '../dtos/signin.dto';
import { SignInProvider } from './sign-in.provider';
import { RefreshTokensProvider } from './refresh-tokens.provider';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';

/** Service handling authentication logic */
@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    // Inject signInProvider
    private readonly signInProvider: SignInProvider,

    // Inject refreshTokensProvider
    private readonly refreshTokensProvider: RefreshTokensProvider,
  ) {}

  /** Handles user signin process */
  public async signIn(signInDto: SignInDto) {
    return await this.signInProvider.signIn(signInDto);
  }

  /** Handles refresh token generation */
  public async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    return await this.refreshTokensProvider.refreshTokens(refreshTokenDto);
  }
}
