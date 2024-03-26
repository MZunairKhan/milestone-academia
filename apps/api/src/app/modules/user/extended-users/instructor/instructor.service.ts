import { Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../../entity/user.entity';
import { Instructor } from './entity/instructor.entity';
import { ReadInstructorDTO } from './dto/read-instructor.dto';
import { CreateInstructorDTO } from './dto/create-instructor.dto';
import { extendedPersonService } from '../extended-user.service';
import { Course } from '../../../course/entity/course.entity';

@Injectable()
export class InstructorService implements extendedPersonService<Instructor> {
  constructor(
    @InjectRepository(Instructor)
    private readonly instructorsRepository: Repository<Instructor>
  ) {}

  async create(user: User): Promise<Instructor> {
    const instructor = new Instructor();
    instructor.user = user;

    return this.instructorsRepository.save(instructor);
  }

  async createViaObject(instructor: Instructor): Promise<Instructor> {
    return this.instructorsRepository.save(instructor);
  }

  async assignCourse(instructorId: string, courseId: string) {
    const instructor = await this.instructorsRepository.findOne({ where: {id: instructorId}, relations: ['courses'] });

    if (!instructor) {
      throw new BadRequestException('invalid instructor');
    }

    instructor.courses.push({id : courseId} as Course);

    await this.instructorsRepository.save(instructor);
  }

  async findAll(): Promise<Instructor[]> {
    return this.instructorsRepository.find();
  }

  findOne(id: string): Promise<Instructor> {
    return this.instructorsRepository.findOneBy({ id: id });
  }

  findOneByUser(user: User): Promise<Instructor> {
    return this.instructorsRepository.findOne({ where: {user: user}, relations: ['user']})
  }

  findOneByUserId(id: string): Promise<Instructor> {
    return this.instructorsRepository.findOne({ where: {user: { id : id }}, relations: ['user', 'courses']})
  }

  findOneByUsername(userName: string): Promise<Instructor> {
    return this.instructorsRepository.findOne({ where: {user: { userName : userName} }, relations: ['user']})
  }

  findOneByUPN(email: string) {
    return this.instructorsRepository.findOne({ where: {user: { email : email} }, relations: ['user']})
  }

  async remove(id: string): Promise<void> {
    await this.instructorsRepository.delete(id);
  }

  mapToDto(instructor: Instructor): ReadInstructorDTO {
    const { id, personalIdentification, addressLine1, addressLine2, postalCode, city,
      country, guardianName, guardianIdentification, phoneNumber, courses
    } = instructor;

    return { id, personalIdentification, addressLine1, addressLine2, postalCode, city,
      country, guardianName, guardianIdentification, phoneNumber, courses
    } as ReadInstructorDTO;
  }

  mapToObject(dto: CreateInstructorDTO): Instructor {
    const instructor = new Instructor();

    instructor.personalIdentification = dto.personalIdentification;
    instructor.addressLine1 = dto.addressLine1;
    instructor.addressLine2 = dto.addressLine2;
    instructor.postalCode = dto.postalCode;
    instructor.city = dto.city;
    instructor.country = dto.country;
    instructor.guardianName = dto.guardianName;
    instructor.guardianIdentification = dto.guardianIdentification;
    instructor.guardianEmail = dto.guardianEmail;
    instructor.phoneNumber = dto.phoneNumber;

    return instructor;
  }
}