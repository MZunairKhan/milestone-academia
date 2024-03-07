import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OnsiteCourseBookingService } from './onSiteCourseBooking.service';
import { OnSiteCourseBooking } from './entities/onSiteCourseBooking.entity';
import { OnsiteCourseBookingController } from './onSiteCourseBooking.controller';
import { CoursesModule } from '../../course/course.module';
import { UsersModule } from '../../user/users.module';
import { DurationModule } from '../course-duration/courseDuration.module';
import { StudentsModule } from '../../user/extended-users/student/students.module';

@Module({
  imports: [TypeOrmModule.forFeature([OnSiteCourseBooking]),
  CoursesModule,
  UsersModule,
  DurationModule,
  StudentsModule
],

  controllers: [OnsiteCourseBookingController],
  providers: [OnsiteCourseBookingService],
  exports: [OnsiteCourseBookingService]

})
export class OnSiteCoureBookingModule {}
