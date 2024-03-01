import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TimeBaseEntity } from '../../../common/entities/timeBase.entity';
import { UserType } from '../enums/userType.enum';
import { PresenceType } from '../enums/presenceType.enum';

@Entity('User')
export class User extends TimeBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  userName: string;

  @Column({ nullable: true })
  pwrd: string;

  @Column()
  email: string;

  @Column({
    type: 'enum',
    enum: UserType,
  })
  userType: string;

  @Column({
    type: 'enum',
    enum: PresenceType,
    default: PresenceType.Online,
  })
  presenceType: string;

  @Column({ default: true })
  isActive: boolean;
}
