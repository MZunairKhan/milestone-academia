import { Body, Controller, Delete, Get, Param, Post, ParseIntPipe, Query, } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

import { CourseService } from './services/course.service';
import { Course } from './entity/course.entity';
import { CreateCourseDTO } from './dto/create-course.dto';
import { readCourseDTO } from './dto/read-course.dto';
import { SearchCourseDTO } from './dto/search-course.dto';
import { returnPaginatedCourseDTOBase } from '@milestone-academia/api-interfaces';
import { LoggerService } from 'apps/api/src/logger/logger.service ';
import { LoggerEnum } from 'apps/api/src/logger/logging.enum';
import { LoggingMessages } from 'apps/api/src/assets/logging-messages';
  
@ApiTags('Course')
@Controller()
export class CoursesController {
  constructor(private readonly coursesService: CourseService,
    private readonly logger: LoggerService
    ) {}

  infoLog(methodName: string ,  message: string){
    const log =  {
      className: CoursesController.name,
      methodName: methodName ,
      message: message,
      level: LoggerEnum.Info
    }
    this.logger.info(log)
    this.logger.saveLog(log)
   }

   errorLog(methodName: string ,  message: string , error: any, stackTrace: any){
    const log =  {
      className: CoursesController.name,
      methodName: methodName ,
      message: message,
      error: error,
      stackTrace: stackTrace
    }
    this.logger.error(log)
   }

  @Post()
  async create(@Body() createSubjectDto: CreateCourseDTO): Promise<Course> {
    try{
      const course = await this.coursesService.create(createSubjectDto);

      this.infoLog(CoursesController.prototype.create.name,LoggingMessages.course.info.create(course.id))
      return course;
    }catch(error){
      this.errorLog(CoursesController.prototype.create.name,
        LoggingMessages.course.error.courseCreationError,error,'')
        throw error

    }

  }

  @Get()
  async findAll(): Promise<readCourseDTO[]> {
    try{
      const courses = await this.coursesService.findAll();
      return courses.map(c => ({...c, subject: c.subject.name}))
    }catch(error){
      this.errorLog(CoursesController.prototype.findAll.name,
        LoggingMessages.course.error.errorFindingAll,error,'')
        throw error
    }
    
  }

  @Post('paginated-courses')
  async findPaginatedCourses(
    @Body() searchCourseDTO: SearchCourseDTO,
  ):  Promise<returnPaginatedCourseDTOBase> {
  try{
    const [courses , total] = await this.coursesService.findCoursesWithFilterAndPagination( searchCourseDTO);
    
    const {limit , page} = searchCourseDTO ;
    const totalPages = Math.ceil(total / searchCourseDTO.limit);

    return {
      courses: courses.map(c => this.coursesService.mapToDto(c)),
      total,
      page,
      limit,
      totalPages
    };
  }catch(error){
    this.errorLog(CoursesController.prototype.findPaginatedCourses.name,
      LoggingMessages.course.error.errorfindPaginatedCourses,error,'')
      throw error
  }
    
    
  }

  @Get(':id')
 async findOne(@Param('id') id: string): Promise<Course> {
    try{
      return await this.coursesService.findOne(id);

    }catch(error){
      this.errorLog(CoursesController.prototype.findOne.name,
        LoggingMessages.course.error.errorFinfingOneById(id),error,'')
        throw error
    }
  }

  @Delete(':id')
 async remove(@Param('id') id: string): Promise<void> {
  try{
    const response = await this.coursesService.remove(id);

    this.infoLog(CoursesController.prototype.remove.name, LoggingMessages.course.info.delete(id))

    return response
  }catch(error){
    this.errorLog(CoursesController.prototype.remove.name,
      LoggingMessages.course.error.deleteCourseFailed(id),error,'')
      throw error
  }
    
  }
}