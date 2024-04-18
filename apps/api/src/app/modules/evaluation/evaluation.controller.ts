import { Body, Controller, Delete, Get, Param, Post, ParseIntPipe, Query, Patch, BadRequestException, } from '@nestjs/common';
import {ApiTags } from '@nestjs/swagger';

import { CreateMcqsDTO } from './dto/mcqs.dto';
import { MCQS } from './entities/mcqs.entity';
import { EvaluationService } from './evaluation.service';
import { SearchMcqsDTO } from './dto/seach-mcqs.dto';
import { UpdateMcqsDto } from './dto/update-mcqs.dto';
import { UsersService } from '../user/users.service';
import { LoggerEnum } from 'apps/api/src/logger/logging.enum';
import { LoggerService } from 'apps/api/src/logger/logger.service ';
import { LoggingMessages } from 'apps/api/src/assets/logging-messages';

  
@ApiTags('Evaluation')
@Controller()
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService,
    private readonly usersService: UsersService,
    private readonly logger: LoggerService
    ) {}

    infoLog(methodName: string ,  message: string){
      const log =  {
        className: EvaluationController.name,
        methodName: methodName ,
        message: message,
        level: LoggerEnum.Info
      }
      this.logger.info(log)
      this.logger.saveLog(log)
     }
  
     errorLog(methodName: string ,  message: string , error: any, stackTrace: any){
      const log =  {
        className: EvaluationController.name,
        methodName: methodName ,
        message: message,
        error: error,
        stackTrace: stackTrace
      }
      this.logger.error(log)
     }

  @Post('create-mcqs')
  async createMcqs(@Body() mcqsDto: CreateMcqsDTO): Promise<MCQS> {
    try{
      const evaluation  =  await this.evaluationService.createMcqs(mcqsDto);

      this.infoLog(EvaluationController.prototype.createMcqs.name,
        LoggingMessages.evaluation.info.createMcq(evaluation.id))

      return evaluation

    }catch(error){
      this.errorLog(EvaluationController.prototype.createMcqs.name,
        LoggingMessages.evaluation.error.mcqCreationError,error,'')
        throw error
    }
  }

  @Get('getAll-mcqs')
  async findAllMcqs() {
    try{
      return await this.evaluationService.findAllMcqs()

    }catch(error){
      this.errorLog(EvaluationController.prototype.findAllMcqs.name,
        LoggingMessages.evaluation.error.errorFindingAllMcqs,error,'')
        throw error
    }
  }

 
  @Get('findOneMcq/:id')
 async findOneMcq(@Param('id') id: string): Promise<MCQS> {
  try{
    return await this.evaluationService.findOneMcq(id);

  }catch(error){
    this.errorLog(EvaluationController.prototype.findOneMcq.name,
      LoggingMessages.evaluation.error.errorFindingOneMcqs(id),error,'')
      throw error
  }
  }

  @Delete('deleteMcq/:id')
 async remove(@Param('id') id: string): Promise<void> {
    try{
      const response  =  await this.evaluationService.removeMcq(id);

      this.infoLog(EvaluationController.prototype.remove.name,
        LoggingMessages.evaluation.info.mcqDeleted(id) )

      return response

    }catch(error){
      this.errorLog(EvaluationController.prototype.remove.name,
        LoggingMessages.evaluation.error.errorMcqDeletion(id),error,'')
        throw error
    }
  }

  @Post('paginated-mcqs')
  async findPaginatedMcqs(
    @Body() searchMcqDTO: SearchMcqsDTO,
  ) {
   try{
    const [mcqs , total] = await this.evaluationService.findMcqsWithFilterAndPagination( searchMcqDTO);
    
    const {limit , page} = searchMcqDTO ;

    const totalPages = Math.ceil(total / limit);


    return {
      mcqs,
      total,
      page,
      limit,
      totalPages,
    };
   }catch(error){
    this.errorLog(EvaluationController.prototype.findPaginatedMcqs.name,
      LoggingMessages.evaluation.error.errorfindPaginatedMcqs,error,'')
      throw error
   }
    
    
  }

  @Patch('update-mcqs/:id')
  async updateMcqs(
    @Body() updateMcqDto: UpdateMcqsDto,
    @Param('id') id: string
  ) {
    try{
      const mcq = await this.evaluationService.findOneMcq(id);
      if (!mcq) {
        throw new BadRequestException('invalid User');
      }
      await this.evaluationService.updateMcqs(mcq.id, updateMcqDto);

      this.infoLog(EvaluationController.prototype.updateMcqs.name,
        LoggingMessages.evaluation.info.mcqUpdated(id))
  
      return {
        Success: true,
        Message: "Updated Successfully"
      }
    }catch(error){
      this.errorLog(EvaluationController.prototype.updateMcqs.name,
        LoggingMessages.evaluation.error.errorUpdateMcqs(id),error,'')
        throw error
    }
   
  }
}