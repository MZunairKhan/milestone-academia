import { Entity, PrimaryGeneratedColumn, JoinColumn, Column, ManyToOne } from 'typeorm';

import { Course } from '../../course/entity/course.entity';
import { Student } from '../../user/extended-users/student/entity/student.entity';

@Entity()
export class OnSiteEvaluation{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Course )
  @JoinColumn()
  course: Course;

  @ManyToOne(() => Student)
  @JoinColumn()
  student: Student;

  @Column()
  score: number;

  
  @Column()
  total: number;
  
  @Column()
  date: Date;
}