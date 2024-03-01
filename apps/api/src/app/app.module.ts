import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from '../config.service';

import { UsersModule } from './modules/user/users.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './modules/auth/auth.module';
import { SubjectsModule } from './modules/subject/subject.module';
import { CoursesModule } from './modules/course/course.module';
import { SeedingModule } from './modules/seeding/seeding.module';
import { BookingsModule } from './modules/Booking/course-booking/courseBookings.module';
import { DurationModule } from './modules/Booking/course-duration/courseDuration.module';
import { TimeSlotModule } from './modules/Booking/timeslot/timeSlot.module';
import { EmailModule } from './modules/email/email.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

// import { StudentsModule } from './modules/student/students.module';
// import { InstructorsModule } from './modules/instructor/instructor.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    EventEmitterModule.forRoot({
      wildcard: false,
      delimiter: '.',
      newListener: false,
      removeListener: false,
      maxListeners: 10,
      verboseMemoryLeak: false,
      ignoreErrors: false,
    }),
    
    RouterModule.register([
      {
        path: 'users',
        module: UsersModule,
      },
      {
        path: 'seeding',
        module: SeedingModule,
      },
      {
        path: 'auth',
        module: AuthModule,
      },
      {
        path: 'common',
        module: CommonModule,
      },
      {
        path: 'subject',
        module: SubjectsModule
      },
      {
        path: 'course',
        module: CoursesModule
      },
      {
        path: 'bookings',
        module: BookingsModule
      },
      {
        path: 'durations',
        module: DurationModule
      },
      {
        path: 'timeslots',
        module: TimeSlotModule
      },
      {
        path: 'email',
        module: EmailModule
      },
      
    ]),
    CommonModule,
    UsersModule,
    SeedingModule,
    AuthModule,
    SubjectsModule,
    CoursesModule,
    BookingsModule,
    DurationModule,
    TimeSlotModule,
    EmailModule

    // StudentsModule,
    // InstructorsModule
  ],
})
export class AppModule {}