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
import { OnsiteCourseBookingService } from './onSiteCourseBooking.service';
import { CreateOnSiteBookingDto } from './dto/createOnSiteBooking.dto';
  
  @ApiTags('onsite course booking')
  @Controller()
  export class OnsiteCourseBookingController {
    constructor(private readonly onsiteCourseBookingService: OnsiteCourseBookingService) {}
  
    @Post()
    async create(@Body() createOnSiteBookingDto: CreateOnSiteBookingDto) {
      return await this.onsiteCourseBookingService.create(createOnSiteBookingDto);
    }
  
    @Get()
    async findAll() {
      return await this.onsiteCourseBookingService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.onsiteCourseBookingService.findOne(id);
    }
  
    @Get('student/:studentId')
    findByStudentId(@Param('studentId') studentId: string) {
      return this.onsiteCourseBookingService.findByStudentId(studentId);
    }

    @Get('user/:userId')
   async findByEmail(@Param('userId') userId: string) {
      const bookings  = await this.onsiteCourseBookingService.findByUserId(userId)
      return bookings
    }
  
    @Get('course/:courseId')
    findByCourseId(@Param('courseId') courseId: string) {
      return this.onsiteCourseBookingService.findByCourseId(courseId);
    } 
  
    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //   return this.courseDurationService.remove(id);
    // }
  }
  