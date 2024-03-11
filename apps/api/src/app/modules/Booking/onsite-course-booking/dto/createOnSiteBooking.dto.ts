import { CreateOnsiteBookingDTOBase } from '@milestone-academia/api-interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOnSiteBookingDto implements CreateOnsiteBookingDTOBase {
  @ApiProperty()
  courseId: string;

  @ApiProperty()
  studentId: string;

  @ApiProperty()
  courseDurationId: string;

}