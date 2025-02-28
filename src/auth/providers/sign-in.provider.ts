import {
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from '../dtos/signin.dto';
import { UsersService } from 'src/users/providers/users.service';
import { HashingProvider } from './hashing.provider';

@Injectable()
export class SignInProvider {
  constructor(
    // Inject usersService
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    // Inject hashingProvider
    private readonly hashingProvider: HashingProvider,
  ) {}

  public async signIn(signInDto: SignInDto) {
    // Find the user by email
    // Throw error if user not found
    const user = await this.usersService.findOneByEmail(signInDto.email);

    // Check if user is authorized by comparing password hash
    let isAuthorized: boolean = false;

    try {
      isAuthorized = await this.hashingProvider.comparePassword(
        signInDto.password,
        user.password,
      );
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'Error comparing passwords.',
      });
    }

    if (!isAuthorized) {
      throw new UnauthorizedException('Incorrect password');
    }
    // Send confirmation
    return true;
  }
}
