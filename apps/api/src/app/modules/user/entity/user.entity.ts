import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TimeBasesEntity } from '../../../common/entities/timeBase.entity';

@Entity('User')
export class User extends TimeBasesEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column({ default: true })
  isActive: boolean;
}