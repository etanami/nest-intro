/* eslint-disable @typescript-eslint/no-unused-vars */
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetUserParamDto } from '../dtos/get-user-param.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';

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
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    // Check if user exists already
    const user = await this.usersRepository.find({
      where: {
        email: createUserDto.email,
      },
    });

    // Handle rejections

    // Create a new user
    let newUser = this.usersRepository.create(createUserDto);
    newUser = await this.usersRepository.save(newUser);

    return newUser;
  }

  /** The method to get all the users from the database */
  public findAll(
    getUserParamDto: GetUserParamDto,
    limit: number,
    page: number,
  ) {
    const isAuth = this.authService.isAuthenticated();
    console.log(isAuth);

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
    return await this.usersRepository.findOneBy({ id });
  }
}
