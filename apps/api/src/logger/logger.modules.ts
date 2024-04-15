// src/logger/logger.module.ts

import { Module, Global } from '@nestjs/common';
import { LoggerService } from './logger.service ';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from '../logs/log.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Log]),
  ],
  providers: [LoggerService],
  exports: [LoggerService], 
})
export class LoggerModule {}
