import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../../entity/user.entity';
import { Instructor } from './entity/instructor.entity';
import { ReadInstructorDto } from './dto/read-instructor.dto';

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

  findOneByUser(user: User): Promise<Instructor> {
    return this.instructorsRepository.findOne({ where: {user: user}, relations: ['user']})
  }

  findOneByUserId(id: string): Promise<Instructor> {
    return this.instructorsRepository.findOne({ where: {user: { id : id}}, relations: ['user']})
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

  mapToDto(student: Instructor): ReadInstructorDto {
    const { id, personalIdentification, addressLine1, addressLine2, postalCode, city,
      country, guardianName, guardianIdentification, phoneNumber
    } = student;

    return { id, personalIdentification, addressLine1, addressLine2, postalCode, city,
      country, guardianName, guardianIdentification, phoneNumber
    } as ReadInstructorDto;
  }
}