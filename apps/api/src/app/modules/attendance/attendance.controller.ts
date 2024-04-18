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
import { LoggerEnum } from 'apps/api/src/logger/logging.enum';
import { LoggerService } from 'apps/api/src/logger/logger.service ';
import { LoggingMessages } from 'apps/api/src/assets/logging-messages';

@ApiTags('Attendance')
@Controller()
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService,
    private readonly logger: LoggerService) {}

  infoLog(methodName: string ,  message: string){
    const log =  {
      className: AttendanceController.name,
      methodName: methodName ,
      message: message,
      level: LoggerEnum.Info
    }
    this.logger.info(log)
    this.logger.saveLog(log)
   }

   errorLog(methodName: string ,  message: string , error: any, stackTrace: any){
    const log =  {
      className: AttendanceController.name,
      methodName: methodName ,
      message: message,
      error: error,
      stackTrace: stackTrace
    }
    this.logger.error(log);
    throw error
   }

  @Post()
  async create(@Body() attendanceDto: AttendanceDto) {
    try{
      const attendance = await this.attendanceService.create(attendanceDto);

      this.infoLog(AttendanceController.prototype.create.name,
        LoggingMessages.attendance.info.create(attendance.id))

      return attendance

    }catch(error){
     this.errorLog(AttendanceController.prototype.create.name,
      LoggingMessages.attendance.error.attendanceCreationError,error,'')
    }
  }

  @Get('/instructor/:instructorId/course/:courseId/student/:studentId')
async  getStudentAttendance( 
    @Param('instructorId') instructorId: string,
    @Param('courseId') courseId: string,
    @Param('studentId') studentId: string
  ) {
    try{
      return await this.attendanceService.getStudentAttendance(instructorId , courseId ,studentId);

    }catch(error){
      this.errorLog(AttendanceController.prototype.getStudentAttendance.name,
        LoggingMessages.attendance.error.errorFindingOneAttendance(studentId,courseId, instructorId),error,'')
    }
  }

  @Get('/instructor/:instructorId/course/:courseId')
 async getStudentsAttendance( 
    @Param('instructorId') instructorId: string,
    @Param('courseId') courseId: string )
  {
    try{
      return await this.attendanceService.getStudentAttendance(instructorId ,courseId );

    }catch(error){
      this.errorLog(AttendanceController.prototype.getStudentsAttendance.name,
        LoggingMessages.attendance.error.errorFindingAttendanceByCourseAndInstructorId(courseId, instructorId),error,'')
  
    }
  }

  @Get('/course/:courseId/student/:studentId')
 async getStudentAttendanceByCourse( 
    @Param('courseId') courseId: string,
    @Param('studentId') studentId: string
  ) {
    try{
      return await this.attendanceService.getStudentAttendance(null , courseId ,studentId);

    }catch(error){
      this.errorLog(AttendanceController.prototype.getStudentAttendanceByCourse.name,
        LoggingMessages.attendance.error.errorGetStudentAttendanceByCourse(courseId, studentId),error,'')
  

    }
  }

  @Get(':id')
async  findOne(@Param('id') id: string) {
  try{
    return await this.attendanceService.findOne(id);

  }catch(error){
    this.errorLog(AttendanceController.prototype.findOne.name,
      LoggingMessages.attendance.error.errorFindingOneById(id),error,'')

  }
  }
}
