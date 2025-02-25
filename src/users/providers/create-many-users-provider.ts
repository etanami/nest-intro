import {
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { User } from '../user.entity';
import { DataSource } from 'typeorm';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';

@Injectable()
export class CreateManyUsersProvider {
  constructor(
    // Inject Datasource
    private readonly dataSource: DataSource,
  ) {}

  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    const newUsers: User[] = [];

    // create query runner instance
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      // connect query runner to datasource
      await queryRunner.connect();
      // start transaction
      await queryRunner.startTransaction();
    } catch (error) {
      throw new RequestTimeoutException('Could not connect to the database.');
    }

    try {
      //
      for (const user of createManyUsersDto.users) {
        const newUser = queryRunner.manager.create(User, user);
        const result = await queryRunner.manager.save(newUser);
        newUsers.push(result);
      }

      //if successful, commit transaction
      await queryRunner.commitTransaction();
    } catch (error) {
      // if unsuccesful, rollback transaction
      await queryRunner.rollbackTransaction();

      throw new ConflictException('Could not complete transaction', {
        description: String(error),
      });
    } finally {
      try {
        // release connection pool
        await queryRunner.release();
      } catch (error) {
        throw new RequestTimeoutException('Could not release connection.');
      }
    }

    return newUsers;
  }
}
