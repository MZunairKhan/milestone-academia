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
import { CourseDurationService } from './courseDuration.service';
import { CourseDurationDto } from './dto/courseDuration.dto';

@ApiTags('Durations')
@Controller()
export class CourseDurationController {
  constructor(private readonly courseDurationService: CourseDurationService) {}

  @Post()
  create(@Body() courseDurationDto: CourseDurationDto) {
    return this.courseDurationService.create(courseDurationDto);
  }

  @Get()
  findAll() {
    return this.courseDurationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseDurationService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() courseDurationDto: CourseDurationDto
  ) {
    return this.courseDurationService.update(id, courseDurationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseDurationService.remove(id);
  }
}
