import {
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindOneUserByEmailProvider {
  constructor(
    // Inject usersRepository
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  public async findOneByEmail(email: string) {
    let user: User | undefined = undefined;

    // Find user by email
    try {
      user = await this.usersRepository.findOneBy({ email });
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'Error fetching user.',
      });
    }

    // If null, throw an unauthorized error
    if (!user) {
      throw new UnauthorizedException('User does not exist.');
    }

    return user;
  }
}
