import { Body, Controller, Delete, Get, Param, Post, ParseIntPipe, } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Subject } from './entity/subject.entity';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';

  
@ApiTags('Users')
@Controller()
export class SubjectsController {
  constructor(private readonly usersService: SubjectService) {}

  @Post()
  async create(@Body() createSubjectDto: CreateSubjectDto): Promise<string> {
    const subject = await this.usersService.create(createSubjectDto);
    if (subject) {
      return `Subject ${subject.name} created sucessfully`
    } else {
      return `Had an issue creating Subject ${subject.name}`
    }
  }

  @Get()
  findAll(): Promise<Subject[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string): Promise<Subject> {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}