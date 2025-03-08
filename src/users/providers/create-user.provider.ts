import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { User } from '../user.entity';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { MailService } from 'src/mail/providers/mail.service';

@Injectable()
export class CreateUserProvider {
  constructor(
    // Injecting usersRepository
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    // Injecting hashingProvider
    private readonly hashingProvider: HashingProvider,
    // Inject mailService
    private readonly mailService: MailService,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    let existingUser: User | undefined;

    try {
      // Check if user exists already
      existingUser = await this.usersRepository.findOne({
        where: {
          email: createUserDto.email,
        },
      });
    } catch (error) {
      console.error('Database query error:', error);
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try again later.',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    // Handle rejections
    if (existingUser) {
      throw new BadRequestException(
        'The user already exists. Please check your email',
      );
    }

    // Create a new user
    let newUser = this.usersRepository.create({
      ...createUserDto,
      password: await this.hashingProvider.hashingPassword(
        createUserDto.password,
      ),
    });

    // Handle exception
    try {
      newUser = await this.usersRepository.save(newUser);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try again later.',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    // Send email notification to new user
    try {
      await this.mailService.sendUserWelcomeEmail(newUser);
    } catch (error) {
      throw new RequestTimeoutException(error);
    }

    return newUser;
  }
}
