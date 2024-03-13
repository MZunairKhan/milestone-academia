import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesModule } from '../course/course.module';
import { StudentsModule } from '../user/extended-users/student/students.module';
import { OnSiteEvaluation } from './entities/onsiteEvaluation.entity';
import { OnSiteEvaluationService } from './onsiteEvaluation.service';
import { OnSiteEvaluationController } from './onsiteEvaluation.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([OnSiteEvaluation]),
    CoursesModule,
    StudentsModule
  ],
  providers: [OnSiteEvaluationService],
  controllers: [OnSiteEvaluationController],
  exports: [OnSiteEvaluationService]
})
export class OnSiteEvaluationModule {}