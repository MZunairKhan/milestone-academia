
import { LoggerEnum } from 'apps/api/src/logger/logging.enum';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @Column()
  methodName: string;

  @Column()
  className: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({nullable: true})
  createdBy: string;

  @Column({nullable: true})
  value: string;

  @Column({
    type: 'enum',
    enum: LoggerEnum
  })
  
  level: string;
}
