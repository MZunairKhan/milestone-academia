import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Column, ManyToOne } from 'typeorm';

import { TimeBaseEntity } from '../../../common/entities/timeBase.entity';
import { Instructor } from '../../instructor/entity/instructor.entity';
import { Subject } from '../../subject/entity/subject.entity';
import { CourseType } from '../enums/courseTypes.enum';

@Entity()
export class Course extends TimeBaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Instructor)
  @JoinColumn()
  instructor: Instructor;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: CourseType
  })
  courseType: string;
  
  @ManyToOne(() => Subject, (subject) => subject.courses)
  subject: Subject;
}