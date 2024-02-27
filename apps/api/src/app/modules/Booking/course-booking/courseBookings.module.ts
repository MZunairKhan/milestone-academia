import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseBooking } from './entities/courseBooking.entity';
import { BookingsController } from './courseBookings.controller';
import { BookingsService } from './courseBookings.service';
import { CoursesModule } from '../../course/course.module';
import { TimeSlotModule } from '../timeslot/timeSlot.module';
import { DurationModule } from '../course-duration/courseDuration.module';
import { UsersModule } from '../../user/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CourseBooking]),
    CoursesModule,
    UsersModule,
    DurationModule,
    TimeSlotModule,
  ],
  controllers: [BookingsController],
  providers: [BookingsService],
  exports: [BookingsService],
})
export class BookingsModule {}
