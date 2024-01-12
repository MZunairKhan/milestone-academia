import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entity/course.entity';
import { CourseService } from './course.service';
import { CoursesController } from './course.controller';
import { SubjectsModule } from '../subject/subject.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course]),
    SubjectsModule
  ],
  providers: [CourseService],
  controllers: [CoursesController],
  exports: [CourseService]
})
export class CoursesModule {}