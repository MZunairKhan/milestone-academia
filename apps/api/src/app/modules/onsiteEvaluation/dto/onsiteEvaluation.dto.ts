import { ApiProperty } from '@nestjs/swagger';

export class OnSiteEvaluationDto {
  @ApiProperty()
  courseId: string;

  @ApiProperty()
  studentId: string;

  @ApiProperty()
  score: number;

  @ApiProperty()
  total: number;

  @ApiProperty()
  date: Date;

}