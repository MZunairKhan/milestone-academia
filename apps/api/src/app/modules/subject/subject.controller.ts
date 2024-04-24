import { Body, Controller, Delete, Get, Param, Post, ParseIntPipe, Bind, } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Subject } from './entity/subject.entity';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { LoggerService } from 'apps/api/src/logger/logger.service ';
import { LoggerEnum } from 'apps/api/src/logger/logging.enum';
import { LoggingMessages } from 'apps/api/src/assets/logging-messages';
import { UuidValidator } from '../../shared/decorators/uuid-validator.decorator';
import { createErrorLogger } from '../../common/utils';

  
@ApiTags('Subject')
@Controller()
export class SubjectsController {
  constructor(private readonly subjectService: SubjectService,
    private readonly logger: LoggerService) {}

  infoLog(methodName: string ,  message: string){
    const log =  {
      className: SubjectsController.name,
      methodName: methodName ,
      message: message,
      level: LoggerEnum.Info
    }
    this.logger.info(log)
    this.logger.saveLog(log)
   }

   errorLog(methodName: string ,  message: string , error: any, stackTrace: any){
    const log =  {
      className: SubjectsController.name,
      methodName: methodName ,
      message: message,
      error: error,
      stackTrace: stackTrace
    }
    this.logger.error(log);
    throw error
   }

  @Post()
  async create(@Body() createSubjectDto: CreateSubjectDto): Promise<Subject> {
    try{
      const subject = await this.subjectService.create(createSubjectDto);
      this.infoLog(SubjectsController.prototype.create.name,
        LoggingMessages.subject.info.create(subject.id))
   
      return subject
    }catch(error){
      this.errorLog(SubjectsController.prototype.create.name,
        LoggingMessages.subject.error.subjectCreationError,error,'') 
    }
    
  }

  @Get()
 async findAll(): Promise<Subject[]> {
  try{
    return await this.subjectService.findAll();

  }catch(error){
    this.errorLog(SubjectsController.prototype.findAll.name,
      LoggingMessages.subject.error.errorFindingAll,error,'') 
  }
  }

  @Get(':id')
  @Bind(UuidValidator({errorLogger: createErrorLogger()}))
 async findOne(@Param('id', ParseIntPipe) id: string): Promise<Subject> {
  try{
    return await this.subjectService.findOne(id);

  }catch(error){
    this.errorLog(SubjectsController.prototype.findOne.name,
      LoggingMessages.subject.error.errorFinfingOneById(id),error,'') 
  }
  }

  @Delete(':id')
  @Bind(UuidValidator({errorLogger: createErrorLogger()}))
async  remove(@Param('id') id: string): Promise<void> {
  try{
    const res = await this.subjectService.remove(id);

    this.infoLog(SubjectsController.prototype.remove.name,
      LoggingMessages.subject.info.delete(id))

    return res

  }catch(error){
    this.errorLog(SubjectsController.prototype.remove.name,
      LoggingMessages.subject.error.deleteSubjectFailed(id),error,'') 
  }
  }
}