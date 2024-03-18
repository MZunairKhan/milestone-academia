import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TimeBaseEntity } from '../../../common/entities/timeBase.entity';
import { Course } from './course.entity';

@Entity()
export class CourseFeature extends TimeBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
  
  @Column()
  value: number;

  @Column()
  icon: string;

  @ManyToOne(() => Course, (course) => course.content)
  course: Course;
}