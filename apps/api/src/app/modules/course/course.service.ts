import { Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Course } from './entity/course.entity';
import { CreateCourseDTO } from './dto/create-course.dto';
import { SubjectService } from '../subject/subject.service';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>,
    private readonly subjectsService: SubjectService,
  ) {}

  async create(createCourseDto: CreateCourseDTO): Promise<Course> {
    const subject = await this.subjectsService.findOne(createCourseDto.subjectId);
    if (subject) {
      throw new BadRequestException(`Course cannot be created: subject with id ${createCourseDto.subjectId} not found`);
    }

    const content = createCourseDto.content.map(content => ({points: content.points, heading: content.heading}));
    const features = createCourseDto.features.map(feature => ({name: feature.name, value: feature.value, icon: feature.icon}));

    return this.coursesRepository.save({
      subject: subject,
      name: createCourseDto.name,
      courseType: createCourseDto.courseType,
      description: createCourseDto.description,
      subText: createCourseDto.subText,
      details: createCourseDto.details,
      price: createCourseDto.price,
      content: content,
      features: features
    });
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