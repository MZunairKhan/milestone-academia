import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppConfiguration } from './entities/appConfiguration.entity';
import { CommonController } from './common.controller';
import { AppConfigurationService } from './appConfiguration.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([AppConfiguration])],
  providers: [AppConfigurationService],
  controllers: [CommonController],
  exports: [AppConfigurationService]
})

export class CommonModule {}