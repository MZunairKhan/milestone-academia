import { AttendanceStatus, CreateAttedanceDTOBase } from '@milestone-academia/api-interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class AttendanceDto implements CreateAttedanceDTOBase {
  @ApiProperty()
  OnSiteCourseBooking: string;

  @ApiProperty({
    enum: AttendanceStatus,
    isArray: false,
    example: [AttendanceStatus.Absent, AttendanceStatus.Present, AttendanceStatus.Leave],
  })
  attendanceStatus: AttendanceStatus;

  @ApiProperty()
  date: Date;
}
