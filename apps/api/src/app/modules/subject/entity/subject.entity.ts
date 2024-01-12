import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { TimeBasesEntity } from '../../../common/entities/timeBase.entity';
import { Course } from '../../course/entity/course.entity';

@Entity()
export class Subject extends TimeBasesEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Course, (course) => course.subject)
  courses: Course[];
}