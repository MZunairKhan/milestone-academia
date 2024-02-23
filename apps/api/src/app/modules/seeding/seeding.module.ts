import { Module } from '@nestjs/common';

import { UsersModule } from '../user/users.module';
import { CoursesModule } from '../course/course.module';
import { SubjectsModule } from '../subject/subject.module';
import {SeedingService} from  './seeding.service'
import { SeedingController } from './seeding.controller';
import { CommonModule } from '../../common/common.module';

@Module({
  imports: [
    UsersModule,
    CoursesModule,
    SubjectsModule,
    CommonModule
   
  ],
  providers: [SeedingService],
  controllers: [SeedingController],
  exports: [SeedingService],
})
export class SeedingModule {}