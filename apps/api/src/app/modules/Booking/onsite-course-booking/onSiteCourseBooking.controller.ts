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
  
   
  
    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //   return this.courseDurationService.remove(id);
    // }
  }
  