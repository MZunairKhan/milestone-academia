import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TimeBasesEntity } from '../../../common/entities/timeBase.entity';
import { UserType } from '../enums/userType.nume';

@Entity('User')
export class User extends TimeBasesEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  userName: string;

  @Column()
  pwrd: string;

  @Column()
  email: string;

  @Column({
    type: 'enum',
    enum: UserType
  })
  userType: string;

  @Column({ default: true })
  isActive: boolean;
}