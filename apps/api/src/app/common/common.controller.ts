import { Body, Controller, Delete, Get, Param, Post, ParseIntPipe, } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AppConfiguration } from './entities/appConfiguration.entity';

import { AppConfigurationService } from './appConfiguration.service';
import { CreateAppConfigurationDto } from './dto/appConfiguration.dto';

  
@ApiTags('Common')
@Controller()
export class CommonController {
  constructor(private readonly appConfigurationService: AppConfigurationService) {}

  @Post('appConfig')
  create(@Body() createAppConfigurationDto: CreateAppConfigurationDto): Promise<AppConfiguration> {
    return this.appConfigurationService.create(createAppConfigurationDto);
  }

  @Get('appConfig')
  findAll(): Promise<AppConfiguration[]> {
    return this.appConfigurationService.findAll();
  }

  @Get('appConfig/:id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<AppConfiguration> {
    return this.appConfigurationService.findOne(id);
  }

  @Get('appConfigByKey/:key')
  findByKey(@Param('key') key: string): Promise<AppConfiguration> {
    return this.appConfigurationService.findByKey(key);
  }

  @Delete('appConfig/:id')
  remove(@Param('id') id: string): Promise<void> {
    return this.appConfigurationService.remove(id);
  }
}