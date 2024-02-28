import { Module } from '@nestjs/common';
import { CourseDuration } from './entities/courseDuration.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseDurationController } from './courseDuration.controller';
import { CourseDurationService } from './courseDuration.service';

@Module({
  imports: [TypeOrmModule.forFeature([CourseDuration])],
  controllers: [CourseDurationController],
  providers: [CourseDurationService],
  exports: [CourseDurationService]

})
export class DurationModule {}
