import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entity/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { StudentsModule } from '../student/students.module';
import { InstructorsModule } from '../instructor/instructor.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    StudentsModule,
    InstructorsModule
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}