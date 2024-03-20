import { Days } from '@milestone-academia/api-interfaces';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CourseDuration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  // @Column('text', 
  // {
  //   type: 'enum',
  //   enum: Days,
  // })
  // @Column({ type: 'enum', enum: Days, array: true })
  @Column('text', { name: 'days', array: true })
  days: Days[];
}
