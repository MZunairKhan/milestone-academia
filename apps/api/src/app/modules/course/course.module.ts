import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CourseService } from './course.service';
import { CoursesController } from './course.controller';
import { SubjectsModule } from '../subject/subject.module';

import { Course } from './entity/course.entity';
import { CourseContent } from './entity/course-content.entity';
import { CourseFeature } from './entity/course-feature.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course, CourseContent, CourseFeature]),
    SubjectsModule
  ],
  providers: [CourseService],
  controllers: [CoursesController],
  exports: [CourseService]
})
export class CoursesModule {}