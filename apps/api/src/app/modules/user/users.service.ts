import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { StudentsService } from './extended-users/student/student.service';
import { AppConfigurationService } from '../../common/appConfiguration.service';
import { InstructorService } from './extended-users/instructor/instructor.service';

import { User } from './entity/user.entity';
import { UserType } from './enums/userType.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { ReadUserDto } from './dto/read-user.dto';
import { PresenceType } from './enums/presenceType.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly appConfigService: AppConfigurationService,
    private readonly studentService: StudentsService,
    private readonly instructorService: InstructorService
  ) {}

  async create(createUserDto: CreateUserDto, userType?: UserType): Promise<User> {
    const user = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.userName = createUserDto.userName;
    user.email = createUserDto.email;
    user.createdDate = new Date();
    user.userType = UserType.Student;
    
    if (createUserDto.presenceType) {
      user.presenceType = createUserDto.presenceType;
    }
    
    const pepper = await this.appConfigService.findByKey('pepper');
    const hash = await bcrypt.hash(createUserDto.password, Number(pepper.value));
    user.pwrd = hash;

    const createdUser = await this.createUser(user);

    if (userType) {
      if (userType === UserType.Student) {
        await this.createAssociatedEntity(createdUser, UserType.Student);
      }
    }

    return createdUser;
  }

  async createUser(user: User): Promise<User> {
    return await this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOneBy({ id: id });
  }

  findOneByUsername(userName: string): Promise<User> {
    return this.usersRepository.findOneBy({ userName: userName });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async createAssociatedEntity(user: User, associatedEntityType: UserType) {
    let associatedEntity: any = null;

    switch (associatedEntityType) {
      case UserType.Student:
        associatedEntity = await this.studentService.create(user);
        break;
    
      case UserType.Student:
        associatedEntity = await this.instructorService.create(user);
        break;
        
      default:
        break;
    }

    return associatedEntity
  }

  mapToDto(user: User): ReadUserDto {
    return {
      userId: user.id,
      email: user.email,
      userName: user.userName,
      lastName: user.lastName,
      firstName: user.firstName,
      userType: UserType[user.userType],
      presenceType: PresenceType[user.presenceType]
    };
  }
}