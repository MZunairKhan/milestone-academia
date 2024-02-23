import { ApiTags } from '@nestjs/swagger';
import { Controller, Post } from '@nestjs/common';

import { UserType } from '../user/enums/userType.enum';
import { PresenceType } from '../user/enums/presenceType.enum';
import { CourseType } from '../course/enums/courseTypes.enum';
import { CreateCourseDto } from '../course/dto/create-course.dto';
import { CreateSubjectDto } from '../subject/dto/create-subject.dto';
import { SeedingService } from './seeding.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Student } from '../user/extended-users/student/entity/student.entity';

@ApiTags('Seeding')
@Controller()
export class SeedingController {
  constructor(private readonly seedingService: SeedingService) {}

  @Post()
  async seedUser(): Promise<string> {
    const pepper = {
      key: 'pepper',
      value: '10',
    };

    const createPepper = await this.seedingService.seedPepper(pepper);

    const user: CreateUserDto = {
      firstName: 'new',
      lastName: 'new',
      userName: 'new',
      email: 'new@gmail.com',
      password: 'new',
      presenceType: PresenceType.Online,
    };

    const newUser = await this.seedingService.seedUser(user);

    const studentData = {
      createdDate: null,
      createdBy: null,
      updatedDate: null,
      deletedDate: null,
      personalIdentification: 'ss',
      addressLine1: 'line1',
      addressLine2: 'line2',
      postalCode: '765',
      city: 'ISB',
      country: 'PAK',
      guardianName: 'has',
      guardianIdentification: 'done',
      phoneNumber: '567',
      user: newUser,
    };

    const newStudent = await this.seedingService.findStudentById(newUser.id);

    const updatedStudent = await this.seedingService.seedStudent(studentData);

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
