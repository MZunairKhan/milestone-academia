import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TimeSlot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  startTime: string;

  @Column()
  endTime: string;

  
}
