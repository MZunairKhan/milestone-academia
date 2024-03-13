import { ApiProperty } from '@nestjs/swagger';

export class OnSiteEvaluationDto {
  @ApiProperty()
  courseId: string;

  @ApiProperty()
  studentId: string;

  @ApiProperty()
  score: string;

  @ApiProperty()
  total: string;

  @ApiProperty()
  date: Date;

}