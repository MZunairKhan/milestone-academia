import { Days } from '@milestone-academia/api-interfaces';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from '../../../course/entity/course.entity';

@Entity()
export class CourseDuration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;
  
  @Column('text', { name: 'days', array: true })
  days: Days[];
  
  @OneToMany(() => Course, (course) => course.courseDuration)
  courses: Course[];
}
