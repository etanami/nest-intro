import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class CreateManyUsersProvider {
  constructor(
    // Inject Datasource
    private readonly dataSource: DataSource,
  ) {}

  public async createMany(createUsersDto: CreateUserDto[]) {
    const newUsers: User[] = [];

    // create query runner instance
    const queryRunner = this.dataSource.createQueryRunner();

    // connect query runner to datasource
    await queryRunner.connect();
    // start transaction
    await queryRunner.startTransaction();

    try {
      //
      for (const user of createUsersDto) {
        const newUser = queryRunner.manager.create(User, user);
        const result = await queryRunner.manager.save(newUser);
        newUsers.push(result);
      }

      //if successful, commit transaction
      await queryRunner.commitTransaction();
    } catch (error) {
      // if unsuccesful, rollback transaction
      await queryRunner.rollbackTransaction();
    } finally {
      // release connection pool
      await queryRunner.release();
    }

    return newUsers;
  }
}
