import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Days } from '../enums/days.enums';

@Entity()
export class CourseDuration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({
    type: 'enum',
    enum: Days,
  })
  days: string;
}
