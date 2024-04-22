import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {OnSiteEvaluationService } from './onsiteEvaluation.service';
import { OnSiteEvaluationDto } from './dto/onsiteEvaluation.dto';
import { OnSiteEvaluation } from './entities/onsiteEvaluation.entity';
import { LoggerEnum } from 'apps/api/src/logger/logging.enum';
import { LoggerService } from 'apps/api/src/logger/logger.service ';
import { LoggingMessages } from 'apps/api/src/assets/logging-messages';
  
@ApiTags('Onsite-Evaluation')
@Controller()
export class OnSiteEvaluationController {
  constructor(
    private readonly onSiteEvaluationService: OnSiteEvaluationService,
    private readonly logger: LoggerService) {}

    infoLog(methodName: string ,  message: string){
      const log =  {
        className: OnSiteEvaluationController.name,
        methodName: methodName ,
        message: message,
        level: LoggerEnum.Info
      }
      this.logger.info(log)
      this.logger.saveLog(log)
     }
  
     errorLog(methodName: string ,  message: string , error: any, stackTrace: any){
      const log =  {
        className: OnSiteEvaluationController.name,
        methodName: methodName ,
        message: message,
        error: error,
        stackTrace: stackTrace
      }
      this.logger.error(log);
      throw error
     }
  

  @Post()
  async create(@Body() onSiteEvaluationDto: OnSiteEvaluationDto): Promise<OnSiteEvaluation> {
    try{
      const response = await this.onSiteEvaluationService.create(onSiteEvaluationDto);

      this.infoLog(OnSiteEvaluationController.prototype.create.name,
        LoggingMessages.onsiteEvaluation.info.create(response.id))

      return response
    }catch(error){
      this.errorLog(OnSiteEvaluationController.prototype.create.name,
        LoggingMessages.onsiteEvaluation.error.onsiteEvaluationCreationError,error,'') 
    }
    
  }

  @Get()
async  findAll() {
  try{
    return await this.onSiteEvaluationService.findAll();

  }catch(error){
    this.errorLog(OnSiteEvaluationController.prototype.findAll.name,
      LoggingMessages.onsiteEvaluation.error.errorFindingAll,error,'') 
  }
  }

  @Get(':id')
async  findOne(@Param('id') id: string) {
  try{
    return await this.onSiteEvaluationService.findOne(id);

  }catch(error){
    this.errorLog(OnSiteEvaluationController.prototype.findOne.name,
      LoggingMessages.onsiteEvaluation.error.errorFinfingOneById(id),error,'') 
  }
  }

  @Delete(':id')
async  remove(@Param('id') id: string): Promise<void> {
  try{
    return await this.onSiteEvaluationService.remove(id);

  }catch(error){
    this.errorLog(OnSiteEvaluationController.prototype.remove.name,
      LoggingMessages.onsiteEvaluation.error.deleteOnsiteEvaluationFailed(id),error,'') 
  }
  }
}