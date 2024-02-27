import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Course } from '../../../course/entity/course.entity';
import { CourseDuration } from '../../course-duration/entities/courseDuration.entity';
import { TimeSlot } from '../../timeslot/entities/timeSlot.entity';
import { User } from '../../../user/entity/user.entity';

@Entity()
export class CourseBooking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Course, (course) => course.id)
  @JoinColumn()
  course: Course;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: User;

  @ManyToOne(() => CourseDuration, (courseDuration) => courseDuration.id)
  @JoinColumn()
  courseDuration: CourseDuration;

  @ManyToOne(() => TimeSlot, (timeSlot) => timeSlot.id)
  @JoinColumn()
  timeSlot: TimeSlot;
}
