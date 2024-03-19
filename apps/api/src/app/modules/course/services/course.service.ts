import { Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Course } from '../entity/course.entity';
import { CreateCourseDTO } from '../dto/create-course.dto';
import { SubjectService } from '../../subject/subject.service';
import { CourseContentService } from './courseContent.service';
import { CourseFeatureService } from './courseFeature.service';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>,
    private readonly subjectsService: SubjectService,
    private readonly courseContentService: CourseContentService,
    private readonly courseFeatureService: CourseFeatureService,
  ) {}

  async create(createCourseDto: CreateCourseDTO): Promise<Course> {
    const subject = await this.subjectsService.findOne(createCourseDto.subjectId);
    if (!subject) {
      throw new BadRequestException(`Course cannot be created: subject with id ${createCourseDto.subjectId} not found`);
    }

    const content = await this.courseContentService.createByArray(createCourseDto.content);
    const features = await this.courseFeatureService.createByArray(createCourseDto.features);

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
    return this.coursesRepository.find({relations: ['content', 'features']});
  }

  findOne(id: string): Promise<Course> {
    return this.coursesRepository.findOneBy({ id: id });
  }

  async remove(id: string): Promise<void> {
    await this.coursesRepository.delete(id);
  }
}