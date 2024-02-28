import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TimeSlot } from './entities/timeSlot.entity';
import { TimeSlotDto } from './dto/timeSlot.dto';

@Injectable()
export class TimeSlotService {
  constructor(
    @InjectRepository(TimeSlot)
    private readonly timeSlotRepository: Repository<TimeSlot>
  ) {}

  create(timeSlotDto: TimeSlotDto) {
    return this.timeSlotRepository.save(timeSlotDto);
  }

  findAll() {
    return this.timeSlotRepository.find();
  }

  findOne(id: string): Promise<TimeSlot> {
    return this.timeSlotRepository.findOneBy({ id: id });
  }

  async update(id: string, timeSlotDto: TimeSlotDto) {
    const existingTimeSlot = await this.findOne(id);

    if (!existingTimeSlot) {
      throw new Error(`Course with ID ${id} not found`);
    }

    return await this.timeSlotRepository.save({
      id,
      ...timeSlotDto,
    });
  }

  async remove(id: string) {
    const timeSlot = await this.findOne(id);
    if (!timeSlot) {
      return 'Duration Not Exists';
    }

    return await this.timeSlotRepository.remove(timeSlot);
  }
}
