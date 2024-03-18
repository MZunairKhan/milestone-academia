import { ApiTags } from '@nestjs/swagger';
import { Controller, Post } from '@nestjs/common';

import { PresenceType } from '../user/enums/presenceType.enum';
import { CourseType } from '@milestone-academia/api-interfaces';
import { CreateCourseDTO } from '../course/dto/create-course.dto';
import { CreateSubjectDto } from '../subject/dto/create-subject.dto';
import { SeedingService } from './seeding.service';
import { CreateUserDTO } from '../user/dto/create-user.dto';
import { UserType } from '../user/enums/userType.enum';
import { Subject } from '../subject/entity/subject.entity';

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

    // add master user
    await this.seedingService.seedUser({
      firstName: 'Master',
      lastName: 'User',
      userName: 'master',
      email: 'info@milestoneacademia.com',
      password: 'maser',
      presenceType: PresenceType.Online,
      userType: UserType.Master
    });

    const user: CreateUserDTO = {
      firstName: 'new',
      lastName: 'new',
      userName: 'new',
      email: 'muhammadhaseeb0302@gmail.com',
      password: 'new',
      presenceType: PresenceType.Online,
      userType: UserType.Student
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


    // const updatedStudent = await this.seedingService.seedStudent(studentData);
    const subjectMap = new Map<string, Subject>();
    const subjectArray = ['physics', 'chemistry', 'math', 'english', 'pakistan studies', 'urdu', 'islamiyat'];

    for (let i = 0; i < subjectArray.length; i++) {
      const newSubject = await this.seedingService.seedSubject({name: subjectArray[i]});
      subjectMap.set(subjectArray[i], newSubject)
    }

    const newSubject = subjectMap.get(subjectArray[0]);

    const course: CreateCourseDTO = {
      name: 'Seeder',
      courseType: CourseType.Group,
      subjectId: newSubject.id,
      description: 'test description',
      subText: 'test sub text',
      details: 'test details',
      price: 100
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


    const onSiteCourseBookingData = {
      courseId: newCourse.id,
      userId: newUser.id,
      courseDurationId: newDuration.id
    }

    const newOnsiteCourseBooking = await this.seedingService.seedOnsiteCoursebooking(onSiteCourseBookingData)


    const attendanceDate = {
      OnSiteCourseBooking: newOnsiteCourseBooking.id,
      attendanceStatus: 'Present',
      date: new Date
      
    }

    const newAttendance = await this.seedingService.seedAttendance(attendanceDate)

    const OnsiteEvaluation =
    {
      courseId: newCourse.id,
      studentId: newStudent.id,
      score: 92,
      total: 100,
      date: "2024-03-13T09:17:49.162Z"
    }

  const newOnsiteEvaluation =  this.seedingService.seedOnsiteEvaluation(OnsiteEvaluation)


    if (newCourseBooking &&createPepper && newUser && newSubject && newCourse) {
      return `Pepper Added . User ${newUser.firstName} created sucessfully. Subject ${newSubject.name}  created Successfully .Course ${newCourse.name}  created Successfully . New Course Booking Added  `;
    } else {
      return `Had an issue while seeding`;
    }
  }
}
