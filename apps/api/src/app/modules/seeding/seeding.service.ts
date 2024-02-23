import { Injectable } from '@nestjs/common';

import { UsersService } from '../user/users.service';
import { User } from '../user/entity/user.entity';
import { CourseService } from '../course/course.service';
import { SubjectService } from '../subject/subject.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { CreateSubjectDto } from '../subject/dto/create-subject.dto';
import { Subject } from '../subject/entity/subject.entity';
import { CreateCourseDto } from '../course/dto/create-course.dto';
import { Course } from '../course/entity/course.entity';
import { CreateAppConfigurationDto } from '../../common/dto/appConfiguration.dto';
import { AppConfiguration } from '../../common/entities/appConfiguration.entity';
import { AppConfigurationService } from '../../common/appConfiguration.service';

@Injectable()
export class SeedingService {
  constructor(
    private readonly userSeedingService: UsersService,
    private readonly courseSeedingService: CourseService,
    private readonly subjectSeedingService: SubjectService,
    private readonly pepperSeedingService: AppConfigurationService

  ) {}
  
  async seedUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userSeedingService.create(createUserDto);
  }

  async seedSubject(createSubjectDto: CreateSubjectDto): Promise<Subject> {
    return this.subjectSeedingService.create(createSubjectDto);
  }

  async seedCourse(createCourseDto: CreateCourseDto): Promise<Course> {
    return this.courseSeedingService.create(createCourseDto);
  }

  async seedPepper(createAppConfigurationDto: CreateAppConfigurationDto): Promise<AppConfiguration> {
    return this.pepperSeedingService.create(createAppConfigurationDto);
  }
  
}