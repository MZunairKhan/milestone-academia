import { AttendanceStatus } from '@milestone-academia/api-interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class AttendanceDto {
  @ApiProperty()
  OnSiteCourseBooking: string;

  @ApiProperty({
    enum: AttendanceStatus,
  })
  attendanceStatus: AttendanceStatus;

  @ApiProperty()
  date: Date;
}
