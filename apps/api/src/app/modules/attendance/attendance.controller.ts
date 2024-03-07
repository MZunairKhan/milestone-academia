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

  @Get('/student/:studentId/course/:courseId/instructor/:instructorId')
  getStudentAttendance( @Param('studentId') studentId: string,
  @Param('courseId') courseId: string,
  @Param('instructorId') instructorId: string,) {
    return this.attendanceService.getStudentAttendance(studentId , courseId ,instructorId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attendanceService.findOne(id);
  }
}
