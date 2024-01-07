import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'; 

import { AppConfiguration } from './entities/appConfiguration.entity';
import { CreateAppConfigurationDto } from './dto/appConfiguration.dto';

@Injectable()
export class AppConfigurationService {
  constructor(
    @InjectRepository(AppConfiguration)
    private readonly appConfigurationRepository: Repository<AppConfiguration>,
  ) {}

  create(createAppConfigurationDto: CreateAppConfigurationDto): Promise<AppConfiguration> {
    const config = new AppConfiguration();
    config.key = createAppConfigurationDto.key;
    config.value = createAppConfigurationDto.value;
    config.createdDate = new Date();

    return this.appConfigurationRepository.save(config);
  }

  async findAll(): Promise<AppConfiguration[]> {
    return this.appConfigurationRepository.find();
  }

  async findOne(id: number): Promise<AppConfiguration> {
    return this.appConfigurationRepository.findOneBy({ id: id });
  }

  async findByKey(key: string): Promise<AppConfiguration> {
    return this.appConfigurationRepository.findOneBy({ key: key });
  }

  async remove(id: string): Promise<void> {
    await this.appConfigurationRepository.delete(id);
  }
}