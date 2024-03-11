import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OnSiteCourseBooking } from '../../Booking/onsite-course-booking/entities/onSiteCourseBooking.entity';
import { AttendanceStatus } from '@milestone-academia/api-interfaces';

@Entity()
export class Attendance{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => OnSiteCourseBooking,
  )
  @JoinColumn({ name: 'onSiteCourseBookingId' })
  OnSiteCourseBooking: OnSiteCourseBooking;

  @Column({
    type: 'enum',
    enum: AttendanceStatus,
  })
  attendanceStatus: string;

  @Column()
  date: Date;
}
