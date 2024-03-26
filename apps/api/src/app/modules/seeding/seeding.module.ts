import { Module } from '@nestjs/common';

import { UsersModule } from '../user/users.module';
import { CoursesModule } from '../course/course.module';
import { SubjectsModule } from '../subject/subject.module';
import {SeedingService} from  './seeding.service'
import { SeedingController } from './seeding.controller';
import { CommonModule } from '../../common/common.module';
import { StudentsModule } from '../user/extended-users/student/students.module';
import { DurationModule } from '../Booking/course-duration/courseDuration.module';
import { TimeSlotModule } from '../Booking/timeslot/timeSlot.module';
import { BookingsModule } from '../Booking/course-booking/courseBookings.module';
import { OnSiteCoureBookingModule } from '../Booking/onsite-course-booking/onSiteCourseBooking.module';
import { AttendanceModule } from '../attendance/attendance.module';
import { OnSiteEvaluationModule } from '../onsiteEvaluation/onsiteEvaluation.module';
import { EvaluationModule } from '../evaluation/evaluation.module';

@Module({
  imports: [
    UsersModule,
    CoursesModule,
    SubjectsModule,
    CommonModule,
    StudentsModule,
    DurationModule,
    TimeSlotModule,
    BookingsModule,
    OnSiteCoureBookingModule,
    AttendanceModule,
    OnSiteEvaluationModule,
    EvaluationModule
   
  ],
  providers: [SeedingService],
  controllers: [SeedingController],
  exports: [SeedingService],
})
export class SeedingModule {}