import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Column, ManyToOne } from 'typeorm';

import { CourseType } from '../enums/courseTypes.enum';
import { Subject } from '../../subject/entity/subject.entity';
import { TimeBaseEntity } from '../../../common/entities/timeBase.entity';
import { Instructor } from '../../user/extended-users/instructor/entity/instructor.entity';

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