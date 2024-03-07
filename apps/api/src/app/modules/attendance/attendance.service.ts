import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttendanceDto } from './dto/createAttendance.dto';
import { Attendance } from './entities/attendance.entity';
import { Repository } from 'typeorm';
import { OnsiteCourseBookingService } from '../Booking/onsite-course-booking/onSiteCourseBooking.service';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,
    private readonly onsiteCourseBookingService: OnsiteCourseBookingService
  ) {}

  async create(attendanceDto: AttendanceDto) {
    const { OnSiteCourseBooking, date , attendanceStatus} = attendanceDto;

    const course = await this.onsiteCourseBookingService.findOne(
      OnSiteCourseBooking
    );
    if (!course) {
      throw new NotFoundException(
        `OnSiteCourseBooking with ID ${OnSiteCourseBooking} not found`
      );
    }
    const newAttendance = new Attendance();
    newAttendance.OnSiteCourseBooking = course;
    newAttendance.date = date;
    newAttendance.attendanceStatus = attendanceStatus;


    const savedAttendance = await this.attendanceRepository.save(newAttendance);

    return savedAttendance;
  }

  async getStudentAttendance(
    studentId: string,
    courseId: string,
    instructorId: string
  ) {
    const attendanceRepository = this.attendanceRepository;

    const result = await attendanceRepository
      .createQueryBuilder('attendance')
      .leftJoinAndSelect(
        'attendance.OnSiteCourseBooking',
        'OnSiteCourseBooking'
      )
      .leftJoinAndSelect('OnSiteCourseBooking.course', 'course')
      .leftJoinAndSelect('OnSiteCourseBooking.student', 'student')
      .leftJoinAndSelect('OnSiteCourseBooking.courseDuration', 'courseDuration')
      .leftJoinAndSelect('course.instructor', 'instructor')
      .select([
        'attendance.id',
        'attendance.date',
        'OnSiteCourseBooking.id',
        'student.id',
        'course.id',
        'course.name',
        'courseDuration.id',
        'instructor.id',
      ])
      .where(
        'student.id = :studentId AND course.id = :courseId AND instructor.id = :instructorId',
        { studentId, courseId, instructorId }
      )
      .getManyAndCount();


    // console.log(result[0][0].OnSiteCourseBooking.user.userName);

    return result;
  }

  async findOne(id: string) {
    return await this.attendanceRepository.findOneBy({ id: id });
  }
}
