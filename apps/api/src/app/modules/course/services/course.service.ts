import { Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Course } from '../entity/course.entity';
import { CreateCourseDTO } from '../dto/create-course.dto';
import { SubjectService } from '../../subject/subject.service';
import { CourseContentService } from './courseContent.service';
import { CourseFeatureService } from './courseFeature.service';
import { CourseDurationService } from '../../Booking/course-duration/courseDuration.service';
import { SearchCourseDTO } from '../dto/search-course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>,
    private readonly subjectsService: SubjectService,
    private readonly courseContentService: CourseContentService,
    private readonly courseFeatureService: CourseFeatureService,
    private readonly courseDurationService: CourseDurationService,
  ) {}

  async create(createCourseDto: CreateCourseDTO): Promise<Course> {
    const subject = await this.subjectsService.findOne(createCourseDto.subjectId);
    if (!subject) {
      throw new BadRequestException(`Course cannot be created: subject with id ${createCourseDto.subjectId} not found`);
    }

    const courseDuration = await this.courseDurationService.findOne(createCourseDto.courseDurationId);
    if (!courseDuration) {
      throw new BadRequestException(`Course cannot be created: course duration with id ${createCourseDto.courseDurationId} not found`);
    }

    const content = await this.courseContentService.createByArray(createCourseDto.content);
    const features = await this.courseFeatureService.createByArray(createCourseDto.features);

    return this.coursesRepository.save({
      subject: subject,
      courseDuration: courseDuration,
      name: createCourseDto.name,
      courseType: createCourseDto.courseType,
      courseLevel: createCourseDto.courseLevel,
      description: createCourseDto.description,
      subText: createCourseDto.subText,
      details: createCourseDto.details,
      price: createCourseDto.price,
      content: content,
      features: features
    });
  }

  async findAll(): Promise<Course[]> {
    return this.coursesRepository.find({relations: ['courseDuration', 'content', 'features', 'subject']});
  }

  async findCoursesWithFilterAndPagination(
    searchCourseDTO : SearchCourseDTO
  ) {
    const {name , courseType , courseLevel , subject , page , limit} = searchCourseDTO ;

    const pages = page ? page : 1
    const limits = limit ? limit : 1

    const queryBuilder = this.coursesRepository.createQueryBuilder('course');

    if (courseLevel && courseLevel.length > 0) {
      queryBuilder.where('course.courseLevel IN (:...courseLevels)', { courseLevels: courseLevel });
    }

    if (courseType && courseType.length > 0) {
      queryBuilder.andWhere('course.courseType IN (:...courseTypes)', { courseTypes: courseType });
    }

    if (subject) {
      queryBuilder.andWhere('course.subject = :subject', { subject });
    }

    if (name) {
      const searchTerm = `%${name}%`;
      queryBuilder.andWhere('course.name LIKE :name', { name: searchTerm });
    }

    queryBuilder.andWhere('course.deletedDate IS NULL')
    queryBuilder.skip((pages - 1) * limits).take(limit);


    return await queryBuilder.getManyAndCount();
  }

  findOne(id: string): Promise<Course> {
    return this.coursesRepository.findOne({relations: ['courseDuration', 'content', 'features', 'subject'], where: {id: id}});
  }

  async remove(id: string): Promise<void> {
    await this.coursesRepository.delete(id);
  }
}