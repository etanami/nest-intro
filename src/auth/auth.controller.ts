import { Controller, Get } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { ApiTags } from '@nestjs/swagger';

/** Controller for authentication operations */
@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /** Handles user login */
  @Get()
  public Login() {
    return this.authService.login;
  }
}
