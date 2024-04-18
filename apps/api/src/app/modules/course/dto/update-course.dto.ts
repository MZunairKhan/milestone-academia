import { PartialType } from '@nestjs/mapped-types';
import { Course } from '../entity/course.entity';


export class UpdateCourseDto extends PartialType(Course) {}
