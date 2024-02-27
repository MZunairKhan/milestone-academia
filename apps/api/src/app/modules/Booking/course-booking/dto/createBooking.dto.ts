import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
  @ApiProperty()
  courseId: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  courseDurationId: string;

  @ApiProperty()
  timeSlotId: string;
}
