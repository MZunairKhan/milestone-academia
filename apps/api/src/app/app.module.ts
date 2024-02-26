import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from '../config.service';

import { UsersModule } from './modules/user/users.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './modules/auth/auth.module';
import { SubjectsModule } from './modules/subject/subject.module';
import { CoursesModule } from './modules/course/course.module';
import { SeedingModule } from './modules/seeding/seeding.module';
// import { StudentsModule } from './modules/student/students.module';
// import { InstructorsModule } from './modules/instructor/instructor.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    RouterModule.register([
      {
        path: 'users',
        module: UsersModule,
      },
      {
        path: 'seeding',
        module: SeedingModule,
      },
      {
        path: 'auth',
        module: AuthModule,
      },
      {
        path: 'common',
        module: CommonModule,
      },
      {
        path: 'subject',
        module: SubjectsModule
      },
      {
        path: 'course',
        module: CoursesModule
      }
    ]),
    CommonModule,
    UsersModule,
    AuthModule,
    SubjectsModule,
    CoursesModule,
    SeedingModule
    // StudentsModule,
    // InstructorsModule
  ]
})
export class AppModule {}