import { Body, Controller, Delete, Get, Param, Post, ParseIntPipe, } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Subject } from './entity/subject.entity';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';

  
@ApiTags('Subject')
@Controller()
export class SubjectsController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post()
  async create(@Body() createSubjectDto: CreateSubjectDto): Promise<string> {
    const subject = await this.subjectService.create(createSubjectDto);
    if (subject) {
      return `Subject ${subject.name} created sucessfully`
    } else {
      return `Had an issue creating Subject ${subject.name}`
    }
  }

  @Get()
  findAll(): Promise<Subject[]> {
    return this.subjectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string): Promise<Subject> {
    return this.subjectService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.subjectService.remove(id);
  }
}