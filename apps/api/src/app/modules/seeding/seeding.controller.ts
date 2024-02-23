import { ApiTags } from '@nestjs/swagger';
import { Controller, Post } from '@nestjs/common';

import { UserType } from '../user/enums/userType.enum';
import { PresenceType } from '../user/enums/presenceType.enum';
import { CourseType } from '../course/enums/courseTypes.enum';
import { CreateCourseDto } from '../course/dto/create-course.dto';
import { CreateSubjectDto } from '../subject/dto/create-subject.dto';
import { SeedingService } from './seeding.service';

@ApiTags('Seeding')
@Controller()
export class SeedingController {
  constructor(private readonly seedingService: SeedingService) {}

  @Post()
  async seedUser(): Promise<string> {
    const pepper = {
        key: 'pepper',
        value: '10'
    }
    
    const createPepper = await this.seedingService.seedPepper(pepper);


    const user = {
      firstName: 'muhammad',
      lastName: 'haseeb',
      userName: 'haseeb786',
      email: 'email@gmail.com',
      password: 'haseeb',
      userType: UserType.Student,
      presenceType: PresenceType.Online,
    };
    const newUser = await this.seedingService.seedUser(user);

    const subject: CreateSubjectDto = {
      name: 'seeding',
    };
    const newSubject = await this.seedingService.seedSubject(subject);
    const course: CreateCourseDto = {
      name: 'Seeder',
      courseType: CourseType.Group,
      subjectId: newSubject.id,
    };
    const newCourse = await this.seedingService.seedCourse(course);

    if (createPepper && newUser && newSubject && newCourse) {
      return `Pepper Added . User ${newUser.firstName} created sucessfully. Subject ${newSubject.name}  created Successfully .Course ${newCourse.name}  created Successfully `;
    } else {
      return `Had an issue while seeding`;
    }
  }
}
