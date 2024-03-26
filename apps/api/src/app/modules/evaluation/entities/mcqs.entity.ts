import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
import {  Levels } from '@milestone-academia/api-interfaces';
import { TimeBaseEntity } from '../../../common/entities/timeBase.entity';
import { Subject } from '../../subject/entity/subject.entity';
  
  @Entity()
  export class MCQS extends TimeBaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @ManyToOne(
      () => Subject,
    )
    @JoinColumn({ name: 'subject' })
    subjectId: Subject;
  
    @Column({
      type: 'enum',
      enum: Levels,
    })
    level: Levels;
  
    @Column()
    question: string;

    @Column('text', { array: true })
    choices: string[];

    @Column()
    correctOption: number;
  }
  