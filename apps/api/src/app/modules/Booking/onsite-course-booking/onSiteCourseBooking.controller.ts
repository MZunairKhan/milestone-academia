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
import { LoggerService } from 'apps/api/src/logger/logger.service ';
import { LoggingMessages } from 'apps/api/src/assets/logging-messages';
import { LoggerEnum } from 'apps/api/src/logger/logging.enum';
  
  @ApiTags('onsite course booking')
  @Controller()
  export class OnsiteCourseBookingController {
    
    constructor(private readonly onsiteCourseBookingService: OnsiteCourseBookingService,
                private readonly logger: LoggerService
      ) {}

     infoLog(methodName: string ,  message: string , level :string ){
      const log =  {
        className: OnsiteCourseBookingController.name,
        methodName: methodName ,
        message: message,
        level: level
      }
      this.logger.info(log)
      this.logger.saveLog(log)
     }

     errorLog(methodName: string ,  message: string , error: any, stackTrace: any){
      const log =  {
        className: OnsiteCourseBookingController.name,
        methodName: methodName ,
        message: message,
        error: error,
        stackTrace: stackTrace
      }
      this.logger.error(log)
     }
  
    @Post()
    async create(@Body() createOnSiteBookingDto: CreateOnSiteBookingDto) {
      try{

        const response  =  await this.onsiteCourseBookingService.create(createOnSiteBookingDto);

        this.infoLog(OnsiteCourseBookingController.prototype.create.name,
          LoggingMessages.onsiteCourseBooking.info.create(response.id),
          LoggerEnum.Info
           )

        return response 
      }catch(error){
        this.errorLog(OnsiteCourseBookingController.prototype.create.name,
          LoggingMessages.onsiteCourseBooking.error.onsiteCourseBookingCreationError,
          error, '')
        throw error;

      }
    }
  
    @Get()
    async findAll() {
      try{
        return await this.onsiteCourseBookingService.findAll();

      }catch(error){
        this.errorLog(OnsiteCourseBookingController.prototype.findAll.name,
          LoggingMessages.onsiteCourseBooking.error.errorGettingAllonsiteCourseBooking,
          error,'')
        throw error;
      }
    }
  
    @Get(':id')
   async findOne(@Param('id') id: string) {
      try{
        return await this.onsiteCourseBookingService.findOne(id);

      }catch(error){
        this.errorLog(OnsiteCourseBookingController.prototype.findOne.name,
          LoggingMessages.onsiteCourseBooking.error.errorGettingById(id),
          error,'')
        throw error;
      }
    }
  
    @Get('student/:studentId')
  async  findByStudentId(@Param('studentId') studentId: string) {
      try{
        return await this.onsiteCourseBookingService.findByStudentId(studentId);

      }catch(error){
        this.errorLog(OnsiteCourseBookingController.prototype.findByStudentId.name,
          LoggingMessages.onsiteCourseBooking.error.errorGettingByStudentId(studentId),
          error,''
          )
        throw error;
      }
    }

    @Get('user/:userId')
   async findByUserId(@Param('userId') userId: string) {
    try{
      const bookings  = await this.onsiteCourseBookingService.findByUserId(userId)
      return bookings
    }catch(error){
      this.errorLog(OnsiteCourseBookingController.prototype.findByUserId.name,
        LoggingMessages.onsiteCourseBooking.error.errorGettingByUserId(userId),
        error,'')
      throw error;
    }
      
    }
  
    @Get('course/:courseId')
    findByCourseId(@Param('courseId') courseId: string) {
      try{
        return this.onsiteCourseBookingService.findByCourseId(courseId);

      }catch(error){
        const log = {
          methodName: OnsiteCourseBookingController.prototype.findByCourseId.name,
          className: OnsiteCourseBookingController.name,
          message: LoggingMessages.onsiteCourseBooking.error.errorGettingByCourseId(courseId),
          stackTrace: '',
          error: error
        }
        this.logger.error(log);
        this.errorLog(OnsiteCourseBookingController.prototype.findByCourseId.name,
          LoggingMessages.onsiteCourseBooking.error.errorGettingByCourseId(courseId),
          error,'')
        throw error;
      }

    } 
  
    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //   return this.courseDurationService.remove(id);
    // }
  }
  