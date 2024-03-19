import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CourseFeature } from '../entity/course-feature.entity';
import { nestedCourseFeatureDTO } from '../dto/nested-entities.dto';

@Injectable()
export class CourseFeatureService {
  constructor(
    @InjectRepository(CourseFeature)
    private readonly coursesFeatureRepository: Repository<CourseFeature>,
  ) {}

  async createByArray(courseFeatures: nestedCourseFeatureDTO[]): Promise<CourseFeature[]> {
    return await this.coursesFeatureRepository.save(courseFeatures)
  }

  async findAll(): Promise<CourseFeature[]> {
    return this.coursesFeatureRepository.find();
  }

  findOne(id: string): Promise<CourseFeature> {
    return this.coursesFeatureRepository.findOneBy({ id: id });
  }

  async remove(id: string): Promise<void> {
    await this.coursesFeatureRepository.delete(id);
  }
}