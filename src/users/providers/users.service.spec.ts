import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { DataSource } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateManyUsersProvider } from './create-many-users-provider';
import { User } from '../user.entity';
import { FindOneByGoogleIdProvider } from './find-one-by-google-id.provider';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';
import { CreateUserProvider } from './create-user.provider';
import { CreateGoogleUserProvider } from './create-google-user.provider';
import { CreateUserDto } from '../dtos/create-user.dto';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const mockCreateUserProvider: Partial<CreateUserProvider> = {
      createUser: (createUserDto: CreateUserDto) =>
        Promise.resolve({
          id: 12,
          firstName: createUserDto.firstName,
          lastName: createUserDto.lastName,
          email: createUserDto.email,
          password: createUserDto.password,
        }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: CreateUserProvider, useValue: mockCreateUserProvider },
        { provide: DataSource, useValue: {} },
        { provide: getRepositoryToken(User), useValue: {} },
        { provide: CreateManyUsersProvider, useValue: {} },
        { provide: FindOneByGoogleIdProvider, useValue: {} },
        { provide: FindOneUserByEmailProvider, useValue: {} },
        { provide: CreateGoogleUserProvider, useValue: {} },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should be defined', () => {
      expect(service.createUser).toBeDefined();
    });

    it('should create a new user', async () => {
      const user = await service.createUser({
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@gmail.com',
        password: 'password',
      });

      expect(user.firstName).toEqual('John');
    });
  });
});
