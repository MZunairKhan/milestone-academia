import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OnSiteCourseBooking } from './entities/onSiteCourseBooking.entity';
import { CreateOnSiteBookingDto } from './dto/createOnSiteBooking.dto';
import { UsersService } from '../../user/users.service';
import { CourseService } from '../../course/course.service';
import { CourseDurationService } from '../course-duration/courseDuration.service';
import { StudentsService } from '../../user/extended-users/student/student.service';


@Injectable()
export class OnsiteCourseBookingService {
  constructor(
    @InjectRepository(OnSiteCourseBooking)
    private readonly onSiteCourseBookingRepository: Repository<OnSiteCourseBooking>,
    private readonly courseService: CourseService,
    private readonly usersService: UsersService,
    private readonly courseDurationService: CourseDurationService,
    private readonly studentsService: StudentsService,

  ) {}

  async create(createOnSiteBookingDto: CreateOnSiteBookingDto) {
    const { courseId, studentId, courseDurationId } = createOnSiteBookingDto;

    const student = await this.studentsService.findOne(studentId);

    if (!student) {
      throw new NotFoundException(`User with ID ${studentId} not found`);
    }

    const course = await this.courseService.findOne(courseId);
    if (!course) {
      throw new NotFoundException(`User with ID ${courseId} not found`);
    }

    const courseDuration = await this.courseDurationService.findOne(courseDurationId);
    if (!courseDuration) {
      throw new NotFoundException(`User with ID ${courseDurationId} not found`);
    }

    const courseBooking = new OnSiteCourseBooking();
    courseBooking.course = course;
    courseBooking.student = student;
    courseBooking.courseDuration = courseDuration;

    const savedBooking = await this.onSiteCourseBookingRepository.save(courseBooking);

    return savedBooking;
  }

  async findAll() {
    return await this.onSiteCourseBookingRepository.find();
  }

  async findOne(id: string): Promise<OnSiteCourseBooking> {

    return  await this.onSiteCourseBookingRepository.findOneBy({id:id});
    
  }



 

}
