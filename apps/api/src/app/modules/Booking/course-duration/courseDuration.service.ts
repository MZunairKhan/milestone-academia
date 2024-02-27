import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseDuration } from './entities/courseDuration.entity';
import { CourseDurationDto } from './dto/courseDuration.dto';

@Injectable()
export class CourseDurationService {
  constructor(
    @InjectRepository(CourseDuration)
    private readonly courseDurationRepository: Repository<CourseDuration>
  ) {}

  async create(courseDurationDto: CourseDurationDto) {
    return this.courseDurationRepository.save(courseDurationDto);
  }

  findAll() {
    return this.courseDurationRepository.find();
  }

 async findOne(id: string): Promise<CourseDuration> {
    return await this.courseDurationRepository.findOneBy({ id : id });
  }

  async update(id: string, courseDurationDto: CourseDurationDto) {
    const existingCourse = await this.findOne(id);

    if (!existingCourse) {
      throw new Error(`Duration with ID ${id} not found`);
    }

    return await this.courseDurationRepository.save({
      id,
      ...courseDurationDto,
    });
  }
  async remove(id: string) {
    const courseDuration = await this.findOne(id);
    if (!courseDuration) {
      return 'Duration Not Exists';
    }

    return await this.courseDurationRepository.remove(courseDuration);
  }
}
