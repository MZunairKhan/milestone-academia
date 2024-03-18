import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TimeBaseEntity } from '../../../common/entities/timeBase.entity';
import { Course } from './course.entity';

@Entity()
export class CourseContent extends TimeBaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  heading: string;

  @Column('simple-array', { nullable: true, array: true })
  points: string[];

  @ManyToOne(() => Course, (course) => course.content)
  course: Course;
}