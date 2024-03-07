import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Attendance } from './entities/attendance.entity';
import { AttendanceController } from './attendance.controller';
import { AttendanceService } from './attendance.service';
import { OnSiteCoureBookingModule } from '../Booking/onsite-course-booking/onSiteCourseBooking.module';
import { DurationModule } from '../Booking/course-duration/courseDuration.module';
import { CoursesModule } from '../course/course.module';
import { UsersModule } from '../user/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Attendance]),
    OnSiteCoureBookingModule,
    CoursesModule,
    UsersModule,
    DurationModule,
  ],
  controllers: [AttendanceController],
  providers: [AttendanceService],
  exports: [AttendanceService],
})
export class AttendanceModule {}
