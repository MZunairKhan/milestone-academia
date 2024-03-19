import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CourseContent } from '../entity/course-content.entity';
import { nestedCourseContentDTO } from '../dto/nested-entities.dto';

@Injectable()
export class CourseContentService {
  constructor(
    @InjectRepository(CourseContent)
    private readonly coursesContentRepository: Repository<CourseContent>,
  ) {}

  async createByArray(courseContents: nestedCourseContentDTO[]): Promise<CourseContent[]> {
    return await this.coursesContentRepository.save(courseContents)
  }

  async findAll(): Promise<CourseContent[]> {
    return this.coursesContentRepository.find();
  }

  findOne(id: string): Promise<CourseContent> {
    return this.coursesContentRepository.findOneBy({ id: id });
  }

  async remove(id: string): Promise<void> {
    await this.coursesContentRepository.delete(id);
  }
}