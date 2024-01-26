import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstructorService } from './instructor.service';
import { Instructor } from './entity/instructor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Instructor])],
  providers: [InstructorService],
  // controllers: [UsersController],
  exports: [InstructorService]
})
export class InstructorsModule {}