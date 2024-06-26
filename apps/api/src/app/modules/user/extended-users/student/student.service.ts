import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../../entity/user.entity';
import { Student } from './entity/student.entity';
import { ReadStudentDTO } from './dto/read-student.dto';
import { CreateStudentDTO } from './dto/create-student.dto';
import { extendedPersonService } from '../extended-user.service';

@Injectable()
export class StudentsService implements extendedPersonService<Student> {
  constructor(
    @InjectRepository(Student)
    private readonly studentsRepository: Repository<Student>
  ) {}

  async create(user: User): Promise<Student> {
    const student = new Student();
    return await this.createViaObject(this.associateToUser(student, user));
  }

  async updateStudent(data: any) {
    const {
      id,
      personalIdentification,
      city,
      phoneNumber,
      guardianIdentification,
      guardianName,
      country,
      postalCode,
      addressLine2,
      addressLine1,
    } = data;

    const existingCourse = await this.findOneByUserId(id);

    if (!existingCourse) {
      throw new Error(`Course with ID ${id} not found`);
    }

    return await this.studentsRepository.save({
      id: id,
      personalIdentification,
      addressLine1,
      addressLine2,
      postalCode,
      country,
      guardianName,
      guardianIdentification,
      phoneNumber,
      city,
    });
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
    return this.studentsRepository.findOne({
      where: { user: user },
      relations: ['user'],
    });
  }

  async findOneByUserId(id: string): Promise<Student> {
    return await this.studentsRepository.findOne({
      where: { user: { id: id } },
      relations: ['user'],
    });
  }

  findOneByUsername(userName: string) {
    return this.studentsRepository.findOne({
      where: { user: { userName: userName } },
      relations: ['user'],
    });
  }

  findOneByUPN(email: string) {
    return this.studentsRepository.findOne({
      where: { user: { email: email } },
      relations: ['user'],
    });
  }

  async remove(id: string): Promise<void> {
    await this.studentsRepository.delete(id);
  }

  mapToDto(student: Student): ReadStudentDTO {
    const {
      id,
      personalIdentification,
      addressLine1,
      addressLine2,
      postalCode,
      city,
      country,
      guardianName,
      guardianIdentification,
      phoneNumber,
    } = student;

    return {
      id,
      personalIdentification,
      addressLine1,
      addressLine2,
      postalCode,
      city,
      country,
      guardianName,
      guardianIdentification,
      phoneNumber,
    } as ReadStudentDTO;
  }

  mapToObject(dto: CreateStudentDTO): Student {
    const student = new Student();

    student.personalIdentification = dto.personalIdentification;
    student.addressLine1 = dto.addressLine1;
    student.addressLine2 = dto.addressLine2;
    student.postalCode = dto.postalCode;
    student.city = dto.city;
    student.country = dto.country;
    student.guardianName = dto.guardianName;
    student.guardianIdentification = dto.guardianIdentification;
    student.guardianEmail = dto.guardianEmail;
    student.phoneNumber = dto.phoneNumber;

    return student;
  }

  associateToUser(student: Student, user: User): Student {
    student.user = user;
    return student;
  }
}
