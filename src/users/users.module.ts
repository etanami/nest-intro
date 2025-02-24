import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './providers/users.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateManyUsersProvider } from './providers/create-many-users-provider';

@Module({
  controllers: [UsersController],
  providers: [UsersService, CreateManyUsersProvider],
  exports: [UsersService],
  imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
