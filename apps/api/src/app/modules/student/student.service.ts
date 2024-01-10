import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Student } from './entity/student.entity';
import { User } from '../user/entity/user.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentsRepository: Repository<Student>
  ) {}

  async create(user: User): Promise<Student> {
    const student = new Student();
    student.user = user;

    return this.studentsRepository.save(student);
  }

  async findAll(): Promise<Student[]> {
    return this.studentsRepository.find();
  }

  findOne(id: string): Promise<Student> {
    return this.studentsRepository.findOneBy({ id: id });
  }

  // findOneByUsername(userName: string): Promise<Student> {
  //   return this.studentsRepository.findOneBy({ userName: userName });
  // }

  async remove(id: string): Promise<void> {
    await this.studentsRepository.delete(id);
  }
}