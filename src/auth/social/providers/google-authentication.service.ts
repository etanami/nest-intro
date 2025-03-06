import {
  forwardRef,
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from 'src/auth/config/jwt.config';
import { GoogleTokenDto } from '../dtos/google-token.dto';
import { UsersService } from 'src/users/providers/users.service';
import { GenerateTokensProvider } from 'src/auth/providers/generate-tokens.provider';

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
  private oauthClient: OAuth2Client;

  constructor(
    // Inject usersService
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    // Inject jwtConfiguration
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    // Inject generateTokensProvider
    private readonly generateTokensProvider: GenerateTokensProvider,
  ) {}

  onModuleInit() {
    const clientId = this.jwtConfiguration.googleClientId;
    const clientSecret = this.jwtConfiguration.googleClientSecret;

    this.oauthClient = new OAuth2Client(clientId, clientSecret);
  }

  public async authenticate(googleTokenDto: GoogleTokenDto) {
    try {
      // Verify the google token from the user
      const loginTicket = await this.oauthClient.verifyIdToken({
        idToken: googleTokenDto.token,
      });

      // Extract the payload from the user
      const {
        email,
        sub: googleId,
        given_name: firstName,
        family_name: lastName,
      } = loginTicket.getPayload();

      // Find the user in the DB using the google Id
      const user = await this.usersService.findOneByGoogleId(googleId);

      // If googleId exist, generate tokens
      if (user) {
        return this.generateTokensProvider.generateTokens(user);
      }

      // If googleId doesn't exist, create a new user and generate tokens
      const newUser = await this.usersService.createGoogleUser({
        email,
        firstName,
        lastName,
        googleId,
      });

      return this.generateTokensProvider.generateTokens(newUser);
    } catch (error) {
      // Throw unauthorized exception error
      throw new UnauthorizedException(error);
    }
  }
}
