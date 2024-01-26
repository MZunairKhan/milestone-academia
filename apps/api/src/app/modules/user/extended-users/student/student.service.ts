import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../../entity/user.entity';
import { Student } from './entity/student.entity';
import { ReadStudentDto } from './dto/read-student.dto';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentsRepository: Repository<Student>
  ) {}

  async create(user: User): Promise<Student> {
    const student = new Student();
    return await this.createViaObject(this.associateToUser(student,user));
  }

  async createViaObject(student: Student): Promise<Student> {
    return this.studentsRepository.save(student);
  }

  async findAll(): Promise<Student[]> {
    return this.studentsRepository.find();
  }

  findOne(id: string): Promise<Student> {
    return this.studentsRepository.findOneBy({ id: id });
  }

  findOneByUser(user: User): Promise<Student> {
    return this.studentsRepository.findOne({ where: {user: user}, relations: ['user']})
  }

  findOneByUsername(userName: string) {
    return this.studentsRepository.findOne({ where: {user: { userName : userName} }, relations: ['user']})
  }

  async remove(id: string): Promise<void> {
    await this.studentsRepository.delete(id);
  }

  mapToDto(student: Student): ReadStudentDto {
    const { id, personalIdentification, addressLine1, addressLine2, postalCode, city,
      country, guardianName, guardianIdentification, phoneNumber
    } = student;

    return { id, personalIdentification, addressLine1, addressLine2, postalCode, city,
      country, guardianName, guardianIdentification, phoneNumber
    } as ReadStudentDto;
  }

  mapToObject(dto: CreateStudentDto): Student {
    const student = new Student();

    student.personalIdentification = dto.personalIdentification;
    student.addressLine1 = dto.addressLine1;
    student.addressLine2 = dto.addressLine2;
    student.postalCode = dto.postalCode;
    student.city = dto.city;
    student.country = dto.country;
    student.guardianName = dto.guardianName;
    student.guardianIdentification = dto.guardianIdentification;
    student.phoneNumber = dto.phoneNumber;

    return student;
  }

  associateToUser(student: Student, user: User): Student {
    student.user = user;
    return student;
  }
}