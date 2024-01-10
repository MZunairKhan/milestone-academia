import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectService } from './subject.service';
import { Subject } from './entity/subject.entity';
import { SubjectsController } from './subject.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Subject])],
  providers: [SubjectService],
  controllers: [SubjectsController],
  exports: [SubjectService]
})
export class SubjectsModule {}