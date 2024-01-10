import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { TimeBasesEntity } from '../../../common/entities/timeBase.entity';

@Entity()
export class Subject extends TimeBasesEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}