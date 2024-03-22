import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OnSiteCourseBooking } from './entities/onSiteCourseBooking.entity';
import { CreateOnSiteBookingDto } from './dto/createOnSiteBooking.dto';
import { UsersService } from '../../user/users.service';
import { CourseService } from '../../course/services/course.service';
import { CourseDurationService } from '../course-duration/courseDuration.service';
import { StudentsService } from '../../user/extended-users/student/student.service';


@Injectable()
export class OnsiteCourseBookingService {
  constructor(
    @InjectRepository(OnSiteCourseBooking)
    private readonly onSiteCourseBookingRepository: Repository<OnSiteCourseBooking>,
    private readonly usersService: UsersService,
    private readonly courseService: CourseService,
    private readonly studentsService: StudentsService,
    private readonly courseDurationService: CourseDurationService,
  ) {}

  async create(createOnSiteBookingDto: CreateOnSiteBookingDto) {
    const { courseId, studentId, courseDurationId } = createOnSiteBookingDto;

    const student = await this.getStudent(studentId);
    const course = await this.courseService.findOne(courseId);

    if (!student) {
      throw new NotFoundException(`Student with ID ${studentId} not found`);
    }

    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }

    const courseDuration = await this.courseDurationService.findOne(courseDurationId);
    if (!courseDuration) {
      throw new NotFoundException(`Course Duration with ID ${courseDurationId} not found`);
    }

    const courseBooking = new OnSiteCourseBooking();
    courseBooking.course = course;
    courseBooking.student = student;
    courseBooking.courseDuration = courseDuration;

    const savedBooking = await this.onSiteCourseBookingRepository.save(courseBooking);

    return savedBooking;
  }

  async findAll() {
    return await this.onSiteCourseBookingRepository.find({ relations: ['student', 'courseDuration'] });
  }

  async findOne(id: string): Promise<OnSiteCourseBooking> {
    return await this.onSiteCourseBookingRepository.findOne({ where: { id : id}, relations: ['student', 'courseDuration'] });
  }

  async findByStudentId(studentId: string): Promise<OnSiteCourseBooking[]> {
    const student = await this.getStudent(studentId);
    return !student ? [] : await this.onSiteCourseBookingRepository.find({  where: { student }, relations: ['student', 'courseDuration'] });
  }
  

  private async getStudent(studentId: string) {
    let student = await this.studentsService.findOne(studentId);

    if (!student) {
      const user = await this.usersService.findOne(studentId);
      student = await this.studentsService.findOneByUser(user);
    }

    return student;
  }
}
