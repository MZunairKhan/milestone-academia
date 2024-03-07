import { ApiProperty } from '@nestjs/swagger';

export class CreateOnSiteBookingDto {
  @ApiProperty()
  courseId: string;

  @ApiProperty()
  studentId: string;

  @ApiProperty()
  courseDurationId: string;

}