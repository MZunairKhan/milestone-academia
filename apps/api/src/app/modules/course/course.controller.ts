import { Body, Controller, Delete, Get, Param, Post, ParseIntPipe, Query, } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

import { CourseService } from './services/course.service';
import { Course } from './entity/course.entity';
import { CreateCourseDTO } from './dto/create-course.dto';
import { readCourseDTO } from './dto/read-course.dto';
import { SearchCourseDTO } from './dto/search-course.dto';
  
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

  @Post('paginated-courses')
  // @ApiQuery({ name: 'name', required: false })
  // @ApiQuery({ name: 'courseType', required: false })
  // @ApiQuery({ name: 'courseLevel', required: false })
  // @ApiQuery({ name: 'subject', required: false})
  // @ApiQuery({ name: 'page', required: false})
  // @ApiQuery({ name: 'limit', required: false })
  async findPaginatedCourses(
    @Body() searchCourseDTO: SearchCourseDTO,
    // @Query('name') name: string,
    // @Query('courseType') courseType: string,
    // @Query('courseLevel') courseLevel: string,
    // @Query('subject') subject: string,
    // @Query('page') page: number,
    // @Query('limit',) limit: number,
  ) {

    const {name , courseType , courseLevel , subject , page , limit} = searchCourseDTO

    const [courses , total] = await this.coursesService.findCoursesWithFilterAndPagination( searchCourseDTO);

    const totalPages = Math.ceil(total / searchCourseDTO.limit);


    return {
      courses,
      total,
      page,
      limit,
      totalPages,
    };
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