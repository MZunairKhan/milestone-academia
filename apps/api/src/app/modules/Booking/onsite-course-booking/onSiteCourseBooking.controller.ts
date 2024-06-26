import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Bind,
  } from '@nestjs/common';
  import { ApiTags } from '@nestjs/swagger';
import { OnsiteCourseBookingService } from './onSiteCourseBooking.service';
import { CreateOnSiteBookingDto } from './dto/createOnSiteBooking.dto';
import { LoggerService } from 'apps/api/src/logger/logger.service ';
import { LoggingMessages } from 'apps/api/src/assets/logging-messages';
import { LoggerEnum } from 'apps/api/src/logger/logging.enum';
import { UuidValidator } from '../../../shared/decorators/uuid-validator.decorator';
import { createErrorLogger } from '../../../common/utils';
  
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
      throw error;
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
        
      }
    }
  
    @Get(':id')
    @Bind(UuidValidator({errorLogger: createErrorLogger()}))
   async findOne(@Param('id') id: string) {
      try{
        return await this.onsiteCourseBookingService.findOne(id);

      }catch(error){
        this.errorLog(OnsiteCourseBookingController.prototype.findOne.name,
          LoggingMessages.onsiteCourseBooking.error.errorGettingById(id),
          error,'')
        
      }
    }
  
    @Get('student/:studentId')
    @Bind(UuidValidator({errorLogger: createErrorLogger()}))
  async  findByStudentId(@Param('studentId') studentId: string) {
      try{
        return await this.onsiteCourseBookingService.findByStudentId(studentId);

      }catch(error){
        this.errorLog(OnsiteCourseBookingController.prototype.findByStudentId.name,
          LoggingMessages.onsiteCourseBooking.error.errorGettingByStudentId(studentId),
          error,''
          )
        
      }
    }

    @Get('user/:userId')
    @Bind(UuidValidator({errorLogger: createErrorLogger()}))
   async findByUserId(@Param('userId') userId: string) {
    try{
      const bookings  = await this.onsiteCourseBookingService.findByUserId(userId)
      return bookings
    }catch(error){
      this.errorLog(OnsiteCourseBookingController.prototype.findByUserId.name,
        LoggingMessages.onsiteCourseBooking.error.errorGettingByUserId(userId),
        error,'')
      
    }
      
    }
  
    @Get('course/:courseId')
    @Bind(UuidValidator({errorLogger: createErrorLogger()}))
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
        
      }

    } 
  
    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //   return this.courseDurationService.remove(id);
    // }
  }
  