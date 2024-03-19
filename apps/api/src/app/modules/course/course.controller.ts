import { Body, Controller, Delete, Get, Param, Post, ParseIntPipe, } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CourseService } from './services/course.service';
import { Course } from './entity/course.entity';
import { CreateCourseDTO } from './dto/create-course.dto';
import { readCourseDTO } from './dto/read-course.dto';
  
@ApiTags('Course')
@Controller()
export class CoursesController {
  constructor(private readonly coursesService: CourseService) {}

  @Post()
  async create(@Body() createSubjectDto: CreateCourseDTO): Promise<Course> {
    const course = await this.coursesService.create(createSubjectDto);
    return course;
    // if (course) {
    //   return `Course ${course.name} created sucessfully`
    // } else {
    //   return `Had an issue creating Course ${course.name}`
    // }
  }

  @Get()
  async findAll(): Promise<readCourseDTO[]> {
    const courses = await this.coursesService.findAll();
    return courses.map(c => ({...c, subject: c.subject.name}))
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Course> {
    return this.coursesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.coursesService.remove(id);
  }
}