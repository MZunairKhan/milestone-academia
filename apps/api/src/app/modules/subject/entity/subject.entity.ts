import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { TimeBaseEntity } from '../../../common/entities/timeBase.entity';
import { Course } from '../../course/entity/course.entity';

@Entity()
export class Subject extends TimeBaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Course, (course) => course.subject)
  courses: Course[];
}