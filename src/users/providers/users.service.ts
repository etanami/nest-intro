/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { GetUserParamDto } from '../dtos/get-user-param.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from '../user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { CreateManyUsersProvider } from './create-many-users-provider';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';
import { CreateUserProvider } from './create-user.provider';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';

/**
 * Class to connect to users table and perform business operations
 */
@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly createManyUsersProvider: CreateManyUsersProvider,

    private readonly createUserProvider: CreateUserProvider,

    // Inject findOneUserByEmail provider
    private readonly findOneUserByEmailProvider: FindOneUserByEmailProvider,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    return this.createUserProvider.createUser(createUserDto);
  }

  /** The method to get all the users from the database */
  public findAll(
    getUserParamDto: GetUserParamDto,
    limit: number,
    page: number,
  ) {
    return [
      {
        firstName: 'John',
        email: 'john@doe.com',
      },
      {
        firstName: 'Alice',
        email: 'alice@doe.com',
      },
    ];
  }

  /** Find a single user by the ID of the user */
  public async findOneById(id: number) {
    let user = undefined;

    try {
      user = await this.usersRepository.findOneBy({ id });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try again later.',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    // Handle exception
    if (!user) {
      throw new BadRequestException('User ID does not exist');
    }

    return user;
  }

  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    return await this.createManyUsersProvider.createMany(createManyUsersDto);
  }

  public async findOneByEmail(email: string) {
    return await this.findOneUserByEmailProvider.findOneByEmail(email);
  }
}
