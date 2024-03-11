import {
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
import { Course } from '../../../course/entity/course.entity';
import { CourseDuration } from '../../course-duration/entities/courseDuration.entity';
import { Student } from '../../../user/extended-users/student/entity/student.entity';
  
  @Entity()
  export class OnSiteCourseBooking {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @ManyToOne(() => Course )
    @JoinColumn()
    course: Course;
  
    @ManyToOne(() => Student)
    @JoinColumn()
    student: Student;
  
    @ManyToOne(() => CourseDuration )
    @JoinColumn()
    courseDuration: CourseDuration;

  }
  