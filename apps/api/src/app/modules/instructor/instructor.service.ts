import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../user/entity/user.entity';
import { Instructor } from './entity/instructor.entity';

@Injectable()
export class InstructorService {
  constructor(
    @InjectRepository(Instructor)
    private readonly instructorsRepository: Repository<Instructor>
  ) {}

  async create(user: User): Promise<Instructor> {
    const instructor = new Instructor();
    instructor.user = user;

    return this.instructorsRepository.save(instructor);
  }

  async findAll(): Promise<Instructor[]> {
    return this.instructorsRepository.find();
  }

  findOne(id: string): Promise<Instructor> {
    return this.instructorsRepository.findOneBy({ id: id });
  }

  async remove(id: string): Promise<void> {
    await this.instructorsRepository.delete(id);
  }
}