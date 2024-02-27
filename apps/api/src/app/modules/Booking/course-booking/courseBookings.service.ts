import { Injectable } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseBooking } from './entities/courseBooking.entity';
import { CreateBookingDto } from './dto/createBooking.dto';
import { SubjectService } from '../../subject/subject.service';
import { CourseService } from '../../course/course.service';
import { UsersService } from '../../user/users.service';
import { CourseDurationService } from '../course-duration/courseDuration.service';
import { TimeSlotService } from '../timeslot/timeSlot.service';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(CourseBooking)
    private readonly courseBookingRepository: Repository<CourseBooking>,
    private readonly courseService: CourseService,
    private readonly usersService: UsersService,
    private readonly courseDurationService: CourseDurationService,
    private readonly timeSlotService: TimeSlotService,

  ) {}

 async create(createBookingDto: CreateBookingDto) {
  const {courseId , userId , courseDurationId , timeSlotId}  = createBookingDto;
  const user  = await this.usersService.findOne(userId);
  const course  = await this.courseService.findOne(courseId);
  const courseDuration  = await  this.courseDurationService.findOne(courseDurationId);
  const timeSlot  = await  this.timeSlotService.findOne(timeSlotId);

  if(!user){
    return 'User Not Found'
  }
  if(!course){
    return 'course Not Found'
  }
  if(!courseDuration){
    return 'courseDuration Not Found'
  }
  if(!timeSlot){
    return 'timeSlot Not Found'
  }

    const courseBooking = new CourseBooking();
    courseBooking.course = course; 
    courseBooking.user = user; 
    courseBooking.courseDuration = courseDuration; 
    courseBooking.timeSlot = timeSlot; 

    const savedBooking = await this.courseBookingRepository.save(courseBooking);

    return savedBooking;
  
 }

  findAll() {
    return this.courseBookingRepository.find();
  }

  findOne(id: string) {
    return this.courseBookingRepository.findBy({ id });
  }

  async update(id: string, createBookingDto: CreateBookingDto) {
    const existingBooking = this.findOne(id);

    if (!existingBooking) {
      return 'Booking Not exists';
    }
    const courseBooking = new CourseBooking();
    courseBooking.course = { id: createBookingDto.courseId } as any; 
    courseBooking.user = { id: createBookingDto.userId } as any; 
    courseBooking.courseDuration = { id: createBookingDto.courseDurationId } as any; 
    courseBooking.timeSlot = { id: createBookingDto.timeSlotId } as any; 

    return await this.courseBookingRepository.save({ id, ...courseBooking });
  }

  async remove(id: string) {
    const existingBooking = await this.findOne(id);

    if (!existingBooking) {
      return 'Resource not found';
    }

    await this.courseBookingRepository.remove(existingBooking);
  }
}
