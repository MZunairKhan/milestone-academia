import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinTable, ManyToMany } from 'typeorm';
import { CourseType } from '@milestone-academia/api-interfaces';

import { CourseContent } from './course-content.entity';
import { CourseFeature } from './course-feature.entity';
import { Subject } from '../../subject/entity/subject.entity';
import { TimeBaseEntity } from '../../../common/entities/timeBase.entity';
import { Instructor } from '../../user/extended-users/instructor/entity/instructor.entity';

@Entity()
export class Course extends TimeBaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => Instructor, {nullable: true})
  @JoinTable()
  categories: Instructor[]

  @Column()
  name: string;

  @Column({nullable: true})
  subText: string;

  @Column({nullable: true})
  details: string;

  @Column({nullable: true})
  price: number;

  @Column({
    type: 'enum',
    enum: CourseType
  })
  courseType: string;
  
  @Column()
  description: string;
  
  @ManyToOne(() => Subject, (subject) => subject.courses)
  subject: Subject;

  @OneToMany(() => CourseContent, (courseContent) => courseContent.course, {nullable: true})
  content?: CourseContent[];

  @OneToMany(() => CourseFeature, (courseFeatures) => courseFeatures.course, {nullable: true})
  features?: CourseFeature[];
}