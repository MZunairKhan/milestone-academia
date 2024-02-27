import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeSlot } from './entities/timeSlot.entity';
import { TimeSlotController } from './timeSlot.controller';
import { TimeSlotService } from './timeSlot.service';

@Module({
  imports: [TypeOrmModule.forFeature([TimeSlot])],
  controllers: [TimeSlotController],
  providers: [TimeSlotService],
  exports: [TimeSlotService]
})
export class TimeSlotModule {}
