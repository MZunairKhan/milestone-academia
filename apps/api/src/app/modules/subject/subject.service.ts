import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../user/entity/user.entity';
import { Subject } from './entity/subject.entity';
import { CreateSubjectDto } from './dto/create-subject.dto';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectsRepository: Repository<Subject>
  ) {}

  async create(subjectDto: CreateSubjectDto): Promise<Subject> {
    const subject = new Subject();
    subject.name = subjectDto.name;

    return this.subjectsRepository.save(subject);
  }

  async findAll(): Promise<Subject[]> {
    return this.subjectsRepository.find();
  }

  findOne(id: string): Promise<Subject> {
    return this.subjectsRepository.findOneBy({ id: id });
  }

  async remove(id: string): Promise<void> {
    await this.subjectsRepository.delete(id);
  }
}