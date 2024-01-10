import { Body, Controller, Delete, Get, Param, Post, ParseIntPipe, } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CourseService } from './course.service';
import { Course } from './entity/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
  
@ApiTags('Course')
@Controller()
export class CoursesController {
  constructor(private readonly coursesService: CourseService) {}

  @Post()
  async create(@Body() createSubjectDto: CreateCourseDto): Promise<string> {
    const course = await this.coursesService.create(createSubjectDto);
    if (course) {
      return `Course ${course.name} created sucessfully`
    } else {
      return `Had an issue creating Course ${course.name}`
    }
  }

  @Get()
  findAll(): Promise<Course[]> {
    return this.coursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string): Promise<Course> {
    return this.coursesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.coursesService.remove(id);
  }
}