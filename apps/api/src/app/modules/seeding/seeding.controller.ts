import { ApiTags } from '@nestjs/swagger';
import { Controller, Post } from '@nestjs/common';

import { UserType } from '../user/enums/userType.enum';
import { PresenceType } from '../user/enums/presenceType.enum';
import { CourseType } from '@milestone-academia/api-interfaces';
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
      description: 'test description'
    };
    const newCourse = await this.seedingService.seedCourse(course);
    
  const durationData = {
    startDate: "2024-02-27T10:54:03.833Z",
    endDate: "2024-02-27T10:54:03.833Z",
    days: "Monday"
  }

  const newDuration = await this.seedingService.seedDuration(durationData);

  const timeSlotData = {
    startTime: "string",
    endTime: "string"
  }
   
  const newTimeSlot =await this.seedingService.seedTimeSlot(timeSlotData);


  const courseBookingData = {
    courseId: newCourse.id,
    userId: newUser.id,
    courseDurationId: newDuration.id,
    timeSlotId: newTimeSlot.id
  }

  const newCourseBooking = await this.seedingService.seedCoursebooking(courseBookingData)

    if (newCourseBooking &&createPepper && newUser && newSubject && newCourse) {
      return `Pepper Added . User ${newUser.firstName} created sucessfully. Subject ${newSubject.name}  created Successfully .Course ${newCourse.name}  created Successfully . New Course Booking Added  `;
    } else {
      return `Had an issue while seeding`;
    }
  }
}
