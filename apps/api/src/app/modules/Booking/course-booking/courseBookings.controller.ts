import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateBookingDto } from './dto/createBooking.dto';
import { ApiTags } from '@nestjs/swagger';
import { BookingsService } from './courseBookings.service';
import { UpdateBookingDto } from './dto/updateBooking.dto';
import { LoggerService } from 'apps/api/src/logger/logger.service ';
import { LoggerEnum } from 'apps/api/src/logger/logging.enum';
import { LoggingMessages } from 'apps/api/src/assets/logging-messages';

@ApiTags('Bookings')
@Controller()
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService,
    private readonly logger: LoggerService
    ) {}

    infoLog(methodName: string ,  message: string){
      const log =  {
        className: BookingsController.name,
        methodName: methodName ,
        message: message,
        level: LoggerEnum.Info
      }
      this.logger.info(log)
      this.logger.saveLog(log)
     }
  
     errorLog(methodName: string ,  message: string , error: any, stackTrace: any){
      const log =  {
        className: BookingsController.name,
        methodName: methodName ,
        message: message,
        error: error,
        stackTrace: stackTrace
      }
      this.logger.error(log);
      
     }

  @Post()
 async create(@Body() createBookingDto: CreateBookingDto) {
    try{
      const booking = await this.bookingsService.create(createBookingDto);

      this.infoLog(BookingsController.prototype.create.name,
        LoggingMessages.courseBooking.info.create(booking.id) )

      return booking

    }catch(error){
      this.errorLog(BookingsController.prototype.create.name,
        LoggingMessages.courseBooking.error.courseBookingCreationError,error,'') 
    }
  }

  @Get()
async  findAll() {
    try{
      return await this.bookingsService.findAll();

    }catch(error){
      this.errorLog(BookingsController.prototype.findAll.name,
        LoggingMessages.courseBooking.error.errorFindingAll,error,'')
    }
  }

  @Get(':id')
 async findOne(@Param('id') id: string) {
    try{
      return await this.bookingsService.findOne(id);

    }catch(error){
      this.errorLog(BookingsController.prototype.findOne.name,
        LoggingMessages.courseBooking.error.errorFinfingOneById(id),error,'')
        
    }
  }

  @Patch(':id')
 async update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    try{
      const response =  await this.bookingsService.update(id, updateBookingDto);
     this.infoLog(BookingsController.prototype.update.name,
      LoggingMessages.courseBooking.info.updateCourseBookingSuccess(id))

      return response 

    }catch(error){
      this.errorLog(BookingsController.prototype.update.name,
        LoggingMessages.courseBooking.error.updateCourseBookingFailed(id),error,'')
    }
  }

  @Delete(':id')
async  remove(@Param('id') id: string) {
  try{
    const response  =  await this.bookingsService.remove(id);
  this.infoLog(BookingsController.prototype.update.name,
    LoggingMessages.courseBooking.info.delete(id))

    return response
  }catch(error){
    this.errorLog(BookingsController.prototype.update.name,
      LoggingMessages.courseBooking.error.deleteCourseBookingFailed(id),error,'')
  }
   
  }
}
