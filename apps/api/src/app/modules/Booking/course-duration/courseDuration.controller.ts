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
import { CourseDurationService } from './courseDuration.service';
import { CourseDurationDto } from './dto/courseDuration.dto';
import { LoggerService } from 'apps/api/src/logger/logger.service ';
import { LoggerEnum } from 'apps/api/src/logger/logging.enum';
import { LoggingMessages } from 'apps/api/src/assets/logging-messages';

@ApiTags('Durations')
@Controller()
export class CourseDurationController {
  constructor(private readonly courseDurationService: CourseDurationService,
    private readonly logger: LoggerService) {}

  infoLog(methodName: string ,  message: string){
    const log =  {
      className: CourseDurationController.name,
      methodName: methodName ,
      message: message,
      level: LoggerEnum.Info
    }
    this.logger.info(log)
    this.logger.saveLog(log)
   }

   errorLog(methodName: string ,  message: string , error: any, stackTrace: any){
    const log =  {
      className: CourseDurationController.name,
      methodName: methodName ,
      message: message,
      error: error,
      stackTrace: stackTrace
    }
    this.logger.error(log);
    throw error
   }

  @Post()
 async create(@Body() courseDurationDto: CourseDurationDto) {
    try{
      const courseDuration = await  this.courseDurationService.create(courseDurationDto);
      this.infoLog(CourseDurationController.prototype.create.name,
        LoggingMessages.courseDuration.info.create(courseDuration.id))

      return courseDuration

    }catch(error){
      this.errorLog(CourseDurationController.prototype.create.name,
        LoggingMessages.courseDuration.error.courseBookingCreationError,error,'') 
    }
 }
  

  @Get()
 async findAll() {
  try{
    return await this.courseDurationService.findAll();

  }catch(error){
    this.errorLog(CourseDurationController.prototype.findAll.name,
      LoggingMessages.courseDuration.error.errorFindingAll,error,'') 
  }
}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try{

      return await this.courseDurationService.findOne(id);
    }catch(error){
      this.errorLog(CourseDurationController.prototype.findOne.name,
        LoggingMessages.courseDuration.error.errorFinfingOneById(id),error,'') 
    }
  }

  @Patch(':id')
async  update(
    @Param('id') id: string,
    @Body() courseDurationDto: CourseDurationDto
  ) {
    try{
      const response  = await this.courseDurationService.update(id, courseDurationDto);
        this.infoLog(CourseDurationController.prototype.update.name,
          LoggingMessages.courseDuration.info.updateCourseDurationSuccess(id))
      return response
    }catch(error){
      this.errorLog(CourseDurationController.prototype.update.name,
        LoggingMessages.courseDuration.error.updateCourseDurationFailed(id),error,'') 
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try{
      const response = await this.courseDurationService.remove(id);
       this.infoLog(CourseDurationController.prototype.remove.name,
        LoggingMessages.courseDuration.info.delete(id))
      return response
    }catch(error){
      this.errorLog(CourseDurationController.prototype.remove.name,
        LoggingMessages.courseDuration.error.deleteCourseDurationFailed(id),error,'') 
    }
  
  }
}
