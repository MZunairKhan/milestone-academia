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
import { TimeSlotService } from './timeSlot.service';
import { TimeSlotDto } from './dto/timeSlot.dto';
import { LoggerEnum } from 'apps/api/src/logger/logging.enum';
import { LoggerService } from 'apps/api/src/logger/logger.service ';
import { LoggingMessages } from 'apps/api/src/assets/logging-messages';

@ApiTags('Timeslots')
@Controller()
export class TimeSlotController {
  constructor(private readonly timeSlotService: TimeSlotService,
    private readonly logger: LoggerService
    ) {}

  infoLog(methodName: string ,  message: string){
    const log =  {
      className: TimeSlotController.name,
      methodName: methodName ,
      message: message,
      level: LoggerEnum.Info
    }
    this.logger.info(log)
    this.logger.saveLog(log)
   }

   errorLog(methodName: string ,  message: string , error: any, stackTrace: any){
    const log =  {
      className: TimeSlotController.name,
      methodName: methodName ,
      message: message,
      error: error,
      stackTrace: stackTrace
    }
    this.logger.error(log);
    throw error
   }


  @Post()
 async create(@Body() timeSlotDto: TimeSlotDto) {
  try{
    const response =  await this.timeSlotService.create(timeSlotDto);

   this.infoLog(TimeSlotController.prototype.create.name,
    LoggingMessages.timeSlot.info.create(response.id))

    return response

  }catch(error){
   this.errorLog(TimeSlotController.prototype.create.name,
        LoggingMessages.timeSlot.error.courseTimeSlotError,error,'') 
  }
  }



  @Get()
 async findAll() {
  try{
    return await this.timeSlotService.findAll();

  }catch(error){
    this.errorLog(TimeSlotController.prototype.findAll.name,
      LoggingMessages.timeSlot.error.errorFindingAll,error,'') 
  }
  }

  @Get(':id')
 async findOne(@Param('id') id: string) {
  try{
    return await this.timeSlotService.findOne(id);

  }catch(error){
    this.errorLog(TimeSlotController.prototype.findOne.name,
      LoggingMessages.timeSlot.error.errorFinfingOneById(id),error,'')
  }
  }

  @Patch(':id')
 async update(@Param('id') id: string, @Body() timeSlotDto: TimeSlotDto) {
  try{
    const response = await this.timeSlotService.update(id, timeSlotDto);
      this.infoLog(TimeSlotController.prototype.update.name,
        LoggingMessages.timeSlot.info.updateTimeSlotSuccess(id))
    return response

  }catch(error){
    this.errorLog(TimeSlotController.prototype.update.name,
      LoggingMessages.timeSlot.error.updateTimeSlotFailed(id),error,'')
  }
  }

  @Delete(':id')
 async remove(@Param('id') id: string) {
  try{
    const response = await this.timeSlotService.remove(id);
          this.infoLog(TimeSlotController.prototype.remove.name,
          LoggingMessages.timeSlot.info.delete(id))
    return response
  }catch(error){
    this.errorLog(TimeSlotController.prototype.remove.name,
      LoggingMessages.timeSlot.error.deleteTimeSlotFailed(id),error,'')
  }
    
  }
}
