import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { UsersService } from 'src/users/providers/users.service';
import { GenerateTokensProvider } from './generate-tokens.provider';

@Injectable()
export class RefreshTokensProvider {
  constructor(
    // Inject jwtService
    private readonly jwtService: JwtService,

    // Inject jwtConfig file
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    // Inject usersService
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    // Inject generateTokensProvider
    private readonly genrateTokensProvider: GenerateTokensProvider,
  ) {}

  public async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    try {
      // Verify the refresh token using jwtService
      const { sub } = await this.jwtService.verifyAsync(
        refreshTokenDto.refreshToken,
        {
          secret: this.jwtConfiguration.secret,
          issuer: this.jwtConfiguration.issuer,
          audience: this.jwtConfiguration.audience,
        },
      );

      // Fetch user from the DB
      const user = await this.usersService.findOneById(sub);

      // Generate the tokens
      return await this.genrateTokensProvider.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
