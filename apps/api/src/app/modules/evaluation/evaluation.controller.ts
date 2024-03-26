import { Body, Controller, Delete, Get, Param, Post, ParseIntPipe, Query, } from '@nestjs/common';
import {ApiTags } from '@nestjs/swagger';

import { CreateMcqsDTO } from './dto/mcqs.dto';
import { MCQS } from './entities/mcqs.entity';
import { EvaluationService } from './evaluation.service';
import { SearchMcqsDTO } from './dto/seach-mcqs.dto';

  
@ApiTags('Evaluation')
@Controller()
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) {}

  @Post('create-mcqs')
  async createMcqs(@Body() mcqsDto: CreateMcqsDTO): Promise<MCQS> {
    return await this.evaluationService.createMcqs(mcqsDto);
  }

  @Get('getAll-mcqs')
  async findAllMcqs() {
   return this.evaluationService.findAllMcqs()
  }

 
  @Get('findOneMcq/:id')
  findOneMcq(@Param('id') id: string): Promise<MCQS> {
    return this.evaluationService.findOneMcq(id);
  }

  @Delete('deleteMcq/:id')
  remove(@Param('id') id: string): Promise<void> {
    return this.evaluationService.removeMcq(id);
  }

  @Post('paginated-mcqs')
  async findPaginatedCourses(
    @Body() searchMcqDTO: SearchMcqsDTO,
  ) {

    
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
  }
}