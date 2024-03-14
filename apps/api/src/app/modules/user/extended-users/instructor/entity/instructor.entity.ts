import { PersonEntity } from 'apps/api/src/app/common/entities/person.entity';
import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../../../entity/user.entity';


@Entity()
export class Instructor extends PersonEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  associateToUser(user: User): Instructor {
    this.user = user;
    return this;
  }
}