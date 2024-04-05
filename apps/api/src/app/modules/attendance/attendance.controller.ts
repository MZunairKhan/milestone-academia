import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AttendanceService } from './attendance.service';
import { AttendanceDto } from './dto/createAttendance.dto';

@ApiTags('Attendance')
@Controller()
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  async create(@Body() attendanceDto: AttendanceDto) {
    return await this.attendanceService.create(attendanceDto);
  }

  @Get('/instructor/:instructorId/course/:courseId/student/:studentId')
  getStudentAttendance( 
    @Param('instructorId') instructorId: string,
    @Param('courseId') courseId: string,
    @Param('studentId') studentId: string
  ) {
    return this.attendanceService.getStudentAttendance(instructorId , courseId ,studentId);
  }

  @Get('/instructor/:instructorId/course/:courseId')
  getStudentsAttendance( 
    @Param('instructorId') instructorId: string,
    @Param('courseId') courseId: string )
  {
    return this.attendanceService.getStudentAttendance(instructorId ,courseId );
  }

  @Get('/course/:courseId/student/:studentId')
  getStudentAttendanceByCourse( 
    @Param('courseId') courseId: string,
    @Param('studentId') studentId: string
  ) {
    return this.attendanceService.getStudentAttendance(null , courseId ,studentId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attendanceService.findOne(id);
  }
}
