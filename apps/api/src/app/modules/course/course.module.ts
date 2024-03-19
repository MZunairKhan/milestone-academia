import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CourseService } from './services/course.service';
import { CoursesController } from './course.controller';
import { SubjectsModule } from '../subject/subject.module';

import { Course } from './entity/course.entity';
import { CourseContent } from './entity/course-content.entity';
import { CourseFeature } from './entity/course-feature.entity';
import { CourseContentService } from './services/courseContent.service';
import { CourseFeatureService } from './services/courseFeature.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course, CourseContent, CourseFeature]),
    SubjectsModule
  ],
  providers: [CourseService, CourseContentService, CourseFeatureService],
  controllers: [CoursesController],
  exports: [CourseService]
})
export class CoursesModule {}