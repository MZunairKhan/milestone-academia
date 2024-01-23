import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

import { User } from '../../user/entity/user.entity';
import { PersonEntity } from '../../../common/entities/person.entity';

@Entity()
export class Instructor extends PersonEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}