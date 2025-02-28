import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dtos/signin.dto';

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
  @HttpCode(HttpStatus.OK)
  public signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
}
