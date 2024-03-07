import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Column, ManyToOne } from 'typeorm';

import { CourseType } from '@milestone-academia/api-interfaces';
import { Subject } from '../../subject/entity/subject.entity';
import { TimeBaseEntity } from '../../../common/entities/timeBase.entity';
import { Instructor } from '../../user/extended-users/instructor/entity/instructor.entity';

@Entity()
export class Course extends TimeBaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Instructor , { eager: true })
  @JoinColumn()
  instructor: Instructor;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: CourseType
  })
  courseType: string;
  
  @Column()
  description: string;
  
  @ManyToOne(() => Subject, (subject) => subject.courses)
  subject: Subject;
}