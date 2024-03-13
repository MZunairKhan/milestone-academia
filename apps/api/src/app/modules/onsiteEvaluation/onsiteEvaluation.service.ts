import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CourseService } from '../course/course.service';
import { StudentsService } from '../user/extended-users/student/student.service';
import { OnSiteEvaluation } from './entities/onsiteEvaluation.entity';
import { OnSiteEvaluationDto } from './dto/onsiteEvaluation.dto';

@Injectable()
export class OnSiteEvaluationService {
  constructor(
    @InjectRepository(OnSiteEvaluation)
    private readonly onSiteEvaluationRepository: Repository<OnSiteEvaluation>,
    private readonly coursesService: CourseService,
    private readonly studentsService: StudentsService
  ) {}

  async create(
    onSiteEvaluationDto: OnSiteEvaluationDto
  ): Promise<OnSiteEvaluation> {
    const student = await this.studentsService.findOne(
      onSiteEvaluationDto.studentId
    );

    if (!student) {
      throw new Error(
        `Student with ID ${onSiteEvaluationDto.studentId} not found`
      );
    }

    const course = await this.coursesService.findOne(
      onSiteEvaluationDto.courseId
    );

    if (!course) {
      throw new Error(
        `Course with ID ${onSiteEvaluationDto.courseId} not found`
      );
    }

    if (onSiteEvaluationDto.total < onSiteEvaluationDto.score) {
      throw new Error(`Total Number must be greater than obtained number`);
    }

    const onsiteEvaluation = new OnSiteEvaluation();
    onsiteEvaluation.course = course;
    onsiteEvaluation.date = onSiteEvaluationDto.date;
    onsiteEvaluation.student = student;
    onsiteEvaluation.score = onSiteEvaluationDto.score;
    onsiteEvaluation.total = onSiteEvaluationDto.total;

    return await this.onSiteEvaluationRepository.save(onsiteEvaluation);
  }

  async findAll(): Promise<OnSiteEvaluation[]> {
    return this.onSiteEvaluationRepository.find();
  }

  findOne(id: string): Promise<OnSiteEvaluation> {
    return this.onSiteEvaluationRepository.findOneBy({ id: id });
  }

  async remove(id: string): Promise<void> {
    await this.onSiteEvaluationRepository.delete(id);
  }
}
