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

  relations = ['student', 'course', 'courseDuration']

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
    return await this.onSiteCourseBookingRepository.find({ relations: this.relations });
  }

  async findOne(id: string): Promise<OnSiteCourseBooking> {
    return await this.onSiteCourseBookingRepository.findOne({ where: { id: id }, relations: this.relations });
  }

  async findByStudentId(studentId: string): Promise<OnSiteCourseBooking[]> {
    const student = await this.getStudent(studentId);
    return !student ? [] : await this.onSiteCourseBookingRepository.find({  where: { student: {id : student.id} }, relations: this.relations });
  }

  async findByCourseId(courseId: string): Promise<any[]> {
    return await this.getStudentsByCourse(courseId);
  }
  
  async findByUserId(id: string): Promise<OnSiteCourseBooking[]> {
    const student = await this.studentsService.findOneByUserId(id);
    return !student ? [] : await this.onSiteCourseBookingRepository.find({  where: { student: {id : student.id} }, relations: this.relations });
  }
  

  private async getStudent(studentId: string) {
    let student = await this.studentsService.findOne(studentId);

    if (!student) {
      const user = await this.usersService.findOne(studentId);
      student = await this.studentsService.findOneByUser(user);
    }

    return student;
  }

  private async getStudentsByCourse(courseId: string) {
    return await this.onSiteCourseBookingRepository
    .createQueryBuilder('on-site-course-booking')
    .leftJoin('on-site-course-booking.course', 'course')
    .leftJoin('on-site-course-booking.student','student')
    .leftJoin('student.user','user')
    .select(['on-site-course-booking.id','course.id','student.id','user.id','user.firstName','user.lastName','user.userName'])
    .where('course.id = :courseId', { courseId })
    .getMany()
  }
}
