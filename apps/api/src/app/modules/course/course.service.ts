import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Course } from './entity/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { SubjectService } from '../subject/subject.service';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>,
    private readonly subjectsService: SubjectService,
  ) {}

  async create(createSubjectDto: CreateCourseDto): Promise<Course> {
    const subject = await this.subjectsService.findOne(createSubjectDto.subjectId);

    if (subject) {
      const course = new Course();
      course.name = createSubjectDto.name;
      course.courseType = createSubjectDto.courseType;
      return this.coursesRepository.save(course);
    }

    return null;
  }

  async findAll(): Promise<Course[]> {
    return this.coursesRepository.find();
  }

  findOne(id: string): Promise<Course> {
    return this.coursesRepository.findOneBy({ id: id });
  }

  async remove(id: string): Promise<void> {
    await this.coursesRepository.delete(id);
  }
}