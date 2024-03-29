import { ApiTags } from '@nestjs/swagger';
import { Controller, Post } from '@nestjs/common';

import { PresenceType } from '../user/enums/presenceType.enum';
import { CourseLevel, CourseType, Days } from '@milestone-academia/api-interfaces';
import { CreateCourseDTO } from '../course/dto/create-course.dto';
import { SeedingService } from './seeding.service';
import { UserType } from '../user/enums/userType.enum';
import { Subject } from '../subject/entity/subject.entity';

@ApiTags('Seeding')
@Controller()
export class SeedingController {
  
  constructor(
    private readonly seedingService: SeedingService
  ) {}

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
      email: 'info@test.com',
      password: 'master',
      presenceType: PresenceType.Online,
      userType: UserType.Master
    }, UserType.Master);

    // add instructor user
    await this.seedingService.seedUser({
      firstName: 'test',
      lastName: 'instructor',
      userName: 'instructor',
      email: 'info@test.com',
      password: 'instructor',
      presenceType: PresenceType.Online,
      userType: UserType.Instructor
    }, UserType.Instructor);

    const newUser = await this.seedingService.seedUser({
      firstName: 'test',
      lastName: 'student 1',
      userName: 'student1',
      email: 'info@test.com',
      password: 'student1',
      presenceType: PresenceType.Online,
      userType: UserType.Student
    });

    await this.seedingService.seedUser({
      firstName: 'test',
      lastName: 'student 2',
      userName: 'student2',
      email: 'info@test.com',
      password: 'student2',
      presenceType: PresenceType.Online,
      userType: UserType.Student
    });

    await this.seedingService.seedUser({
      firstName: 'test',
      lastName: 'student 3',
      userName: 'student3',
      email: 'info@test.com',
      password: 'student3',
      presenceType: PresenceType.Online,
      userType: UserType.Student
    });

    await this.seedingService.seedUser({
      firstName: 'test',
      lastName: 'student 4',
      userName: 'student4',
      email: 'info@test.com',
      password: 'student4',
      presenceType: PresenceType.Online,
      userType: UserType.Student
    });

    await this.seedingService.seedUser({
      firstName: 'test',
      lastName: 'student 5',
      userName: 'student5',
      email: 'info@test.com',
      password: 'student5',
      presenceType: PresenceType.Online,
      userType: UserType.Student
    });

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


    const seedCourseDuration = await this.seedingService.seedDuration({
      startDate: "2024-02-12T10:54:03.833Z",
      endDate: "2024-05-27T10:54:03.833Z",
      days: [Days.Monday, Days.Tuesday, Days.Wednesday, Days.Thursday, Days.Friday]
    });

    // const updatedStudent = await this.seedingService.seedStudent(studentData);
    const subjectMap = new Map<string, Subject>();
    const subjectArray = ['physics', 'chemistry', 'math', 'english', 'pakistan studies', 'urdu', 'islamiyat'];

    for (let i = 0; i < subjectArray.length; i++) {
      const newSubject = await this.seedingService.seedSubject({name: subjectArray[i]});
      subjectMap.set(subjectArray[i], newSubject)
    }

    const newSubject = subjectMap.get(subjectArray[0]);

    for (let i = 0; i < subjectArray.length; i++) {
      const subject = subjectArray[i];
      const subjectId = subjectMap.get(subject).id;
      
      const course: CreateCourseDTO = {
        "name": `${subject} course`,
        "courseType": CourseType.Group,
        "courseLevel": CourseLevel.Alevel,
        "subjectId": subjectId,
        "courseDurationId": seedCourseDuration.id,
        "description": "test description of a course",
        "subText": "test subText of a course",
        "details": "test description of a course test description of a course test description of a course",
        "price": 100,
        "content": [
          {
            "heading": "First Heading",
            "points": [
              "First point of First Heading",
              "Second point of First Heading",
              "Third point of First Heading",
              "Fourthpoint of First Heading"
            ]
          },
          {
            "heading": "Second Heading",
            "points": [
              "First point of Second Heading",
              "Second point of Second Heading",
              "Third point of Second Heading",
              "Fourthpoint of Second Heading"
            ]
          },
          {
            "heading": "Third Heading",
            "points": [
              "First point of Third Heading",
              "Second point of Third Heading",
              "Third point of Third Heading",
              "Fourthpoint of Third Heading"
            ]
          },
          {
            "heading": "Fourth Heading",
            "points": [
              "First point of Fourth Heading",
              "Second point of Fourth Heading",
              "Third point of Fourth Heading",
              "Fourthpoint of Fourth Heading"
            ]
          }
        ],
        "features": [
          {
            "name": "Lectures",
            "value": 26,
            "icon": "group"
          },
          {
            "name": "Assesments",
            "value": 12,
            "icon": "description"
          },
          {
            "name": "Quizzes",
            "value": 12,
            "icon": "info_outline"
          },
          {
            "name": "Notes",
            "value": 30,
            "icon": "format_list_numbered"
          }
        ]
      };
      await this.seedingService.seedCourse(course);
    }

    let timeSlotId = '';
    const timeSlotsArray = [
      { startTime: '03:00 PM', endTime: '3:45 PM'},
      { startTime: '04:00 PM', endTime: '4:45 PM'},
      { startTime: '05:00 PM', endTime: '5:45 PM'},
      { startTime: '06:00 PM', endTime: '6:45 PM'},
      { startTime: '07:00 PM', endTime: '7:45 PM'},
      { startTime: '08:00 PM', endTime: '8:45 PM'},
      { startTime: '09:00 PM', endTime: '9:45 PM'},
      { startTime: '10:00 PM', endTime: '10:45 PM'},
    ]
    
    for (let i = 0; i < timeSlotsArray.length; i++) {
      const slot = await this.seedingService.seedTimeSlot({
        startTime: timeSlotsArray[i].startTime,
        endTime: timeSlotsArray[i].endTime
      });
      timeSlotId = slot.id;
    }
    
    const newDuration = await this.seedingService.seedDuration({
      startDate: "2024-02-27T10:54:03.833Z",
      endDate: "2024-02-27T10:54:03.833Z",
      days: [Days.Monday, Days.Tuesday, Days.Wednesday, Days.Thursday, Days.Friday]
    });

    const newCourse = await this.seedingService.seedCourse({
      name: 'Seeder',
      courseType: CourseType.Group,
      courseLevel: CourseLevel.Alevel,
      subjectId: newSubject.id,
      description: 'test description',
      subText: 'test sub text',
      details: 'test details',
      price: 100,
      content: [],
      features: [],
      courseDurationId: newDuration.id
    });

    const courseBookingData = {
      courseId: newCourse.id,
      userId: newUser.id,
      courseDurationId: newDuration.id,
      timeSlotId: timeSlotId
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

    const newOnsiteEvaluation = await this.seedingService.seedOnsiteEvaluation(OnsiteEvaluation)

    const mcq = {
      question: "What is 2+2?",
      level: 1,
      choices: [
        1,
        3,4,7
      ],
      subject: newSubject,
      correctOption:2
    }

    const newMcq = await this.seedingService.seedMcqs(mcq)


    if (newCourseBooking &&createPepper && newUser && newSubject && newCourse) {
      return `Pepper Added . User ${newUser.firstName} created sucessfully. Subject ${newSubject.name}  created Successfully .Course ${newCourse.name}  created Successfully . New Course Booking Added  `;
    } else {
      return `Had an issue while seeding`;
    }
  }
}
