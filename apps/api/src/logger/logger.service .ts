import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import { createLogger, transports, format } from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LogicalLogger } from './logical-logger';
import { CriticalLogger } from './critical-logger';
import { Log } from '../../../../logs/log.entity';


@Injectable()
export class LoggerService {
  private logger: winston.Logger;

  constructor(    
    @InjectRepository(Log)
  private readonly logRepository: Repository<Log>,
  ) 
  {
    this.logger = createLogger({
      transports: [
        new DailyRotateFile({
          filename: process.env.LOGS_FILE_PATH,
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          level: 'error', 
          format: format.combine(
            format.timestamp(),
            format.json()
          )
        }),
     
        new transports.Console({
          format: format.combine(
            format.colorize(),
            format.simple()
          )
        })
      ]
    });
  }

  info(data: LogicalLogger) {
    this.logger.info(`Message: ${data.message}. Class: ${data.className}. Method: ${data.methodName} value:${data.value} `);
  }

  debug(data: LogicalLogger) {
    this.logger.debug(`Message: ${data.message}. Class: ${data.className}. Method: ${data.methodName} value:${data.value} `);
  }

  warn(data: LogicalLogger) {
    this.logger.warn(`Message: ${data.message}. Class: ${data.className}. Method: ${data.methodName} value:${data.value} `);
  }


  error(data: CriticalLogger) {
    this.logger.error(`Message: ${data.message}, Error: ${data.error} , StackTrace: ${data.stackTrace}, className: ${data.className} , MethodName: ${data.methodName}`);
  }

  saveLog(log: any){
    this.logRepository.save(log)
  }

}
