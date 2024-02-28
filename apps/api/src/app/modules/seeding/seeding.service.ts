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
import { StudentsService } from '../user/extended-users/student/student.service';
import { Student } from '../user/extended-users/student/entity/student.entity';
import { UserType } from '../user/enums/userType.enum';
import { TimeSlotService } from '../Booking/timeslot/timeSlot.service';
import { CourseDurationService } from '../Booking/course-duration/courseDuration.service';
import { BookingsService } from '../Booking/course-booking/courseBookings.service';

@Injectable()
export class SeedingService {
  constructor(
    private readonly userSeedingService: UsersService,
    private readonly courseSeedingService: CourseService,
    private readonly subjectSeedingService: SubjectService,
    private readonly appConfigSeedingService: AppConfigurationService,
    private readonly studentSeedingService: StudentsService,
    private readonly timeSlotService: TimeSlotService,
    private readonly courseDurationService: CourseDurationService,
    private readonly bookingsService: BookingsService
  ) {}

  async seedUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userSeedingService.create(createUserDto, UserType.Student);
  }

  async seedSubject(createSubjectDto: CreateSubjectDto): Promise<Subject> {
    return this.subjectSeedingService.create(createSubjectDto);
  }

  async seedCourse(createCourseDto: CreateCourseDto): Promise<Course> {
    return this.courseSeedingService.create(createCourseDto);
  }

  async seedPepper(
    createAppConfigurationDto: CreateAppConfigurationDto
  ): Promise<AppConfiguration> {
    return this.appConfigSeedingService.create(createAppConfigurationDto);
  }

  async findStudentById(id: any): Promise<Student> {
    return this.studentSeedingService.findOneByUserId(id);
  }

  async seedStudent(data: any) {
    return await this.studentSeedingService.updateStudent(data);
  }

  async seedDuration(data: any) {
    return await this.courseDurationService.create(data);
  }

  async seedTimeSlot(data: any) {
    return await this.timeSlotService.create(data);
  }

  async seedCoursebooking(data: any) {
    return await this.bookingsService.create(data);
  }
}
