import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MCQS } from './entities/mcqs.entity';
import { EvaluationService } from './evaluation.service';
import { EvaluationController } from './evaluation.controller';
import { SubjectsModule } from '../subject/subject.module';
import { UsersModule } from '../user/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MCQS]),
    SubjectsModule,
    UsersModule
  ],
  providers: [EvaluationService],
  controllers: [EvaluationController],
  exports: [EvaluationService]
})
export class EvaluationModule {}