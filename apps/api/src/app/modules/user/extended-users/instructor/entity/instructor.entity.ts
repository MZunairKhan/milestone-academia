import { PersonEntity } from 'apps/api/src/app/common/entities/person.entity';
import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, JoinTable, ManyToMany } from 'typeorm';
import { User } from '../../../entity/user.entity';
import { Course } from '../../../../course/entity/course.entity';


@Entity()
export class Instructor extends PersonEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToMany(() => Course, {nullable: true})
  @JoinTable()
  courses: Course[]

  associateToUser(user: User): Instructor {
    this.user = user;
    return this;
  }
}