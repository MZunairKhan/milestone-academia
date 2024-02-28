import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TimeSlotService } from './timeSlot.service';
import { TimeSlotDto } from './dto/timeSlot.dto';

@ApiTags('Timeslots')
@Controller()
export class TimeSlotController {
  constructor(private readonly timeSlotService: TimeSlotService) {}

  @Post()
  create(@Body() timeSlotDto: TimeSlotDto) {
    return this.timeSlotService.create(timeSlotDto);
  }

  @Get()
  async findAllDurations() {
    return await this.timeSlotService.findAll();
  }

  @Get()
  findAll() {
    return this.timeSlotService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timeSlotService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() timeSlotDto: TimeSlotDto) {
    return this.timeSlotService.update(id, timeSlotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timeSlotService.remove(id);
  }
}
