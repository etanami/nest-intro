import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dtos/signin.dto';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enum/auth-type.enum';
import { RefreshTokenDto } from './dtos/refresh-token.dto';

/** Controller for authentication operations */
@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    // Injecting authService
    private readonly authService: AuthService,
  ) {}

  /** Handles user login */
  @Post('sign-in')
  @Auth(AuthType.None)
  @HttpCode(HttpStatus.OK)
  public signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  /** Handles refresh tokens */
  @Post('refresh-tokens')
  @Auth(AuthType.None)
  @HttpCode(HttpStatus.OK)
  public refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshTokens(refreshTokenDto);
  }
}
