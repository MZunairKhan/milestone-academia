import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

import { User } from '../../user/entity/user.entity';
import { TimeBaseEntity } from '../../../common/entities/timeBase.entity';

@Entity()
export class Student extends TimeBaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}