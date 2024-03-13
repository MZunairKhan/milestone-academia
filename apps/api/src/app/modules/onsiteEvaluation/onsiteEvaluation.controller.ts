import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {OnSiteEvaluationService } from './onsiteEvaluation.service';
import { OnSiteEvaluationDto } from './dto/onsiteEvaluation.dto';
  
@ApiTags('Evaluation')
@Controller()
export class OnSiteEvaluationController {
  constructor(
    private readonly onSiteEvaluationService: OnSiteEvaluationService,
    ) {}

  @Post()
  async create(@Body() onSiteEvaluationDto: OnSiteEvaluationDto) {
    const onsiteEvaluation = await this.onSiteEvaluationService.create(onSiteEvaluationDto);
    return onsiteEvaluation;
  }

  @Get()
  findAll() {
    return this.onSiteEvaluationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.onSiteEvaluationService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.onSiteEvaluationService.remove(id);
  }
}