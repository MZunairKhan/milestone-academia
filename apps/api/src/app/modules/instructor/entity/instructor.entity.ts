import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

import { User } from '../../user/entity/user.entity';
import { TimeBasesEntity } from '../../../common/entities/timeBase.entity';

@Entity()
export class Instructor extends TimeBasesEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}