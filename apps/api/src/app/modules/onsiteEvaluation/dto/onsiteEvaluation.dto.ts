import { OnsiteEvaluationDTOBase } from '@milestone-academia/api-interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class OnSiteEvaluationDto implements OnsiteEvaluationDTOBase {
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