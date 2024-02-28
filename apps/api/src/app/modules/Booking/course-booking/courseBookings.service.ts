import { Injectable, NotFoundException } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseBooking } from './entities/courseBooking.entity';
import { CreateBookingDto } from './dto/createBooking.dto';
import { SubjectService } from '../../subject/subject.service';
import { CourseService } from '../../course/course.service';
import { UsersService } from '../../user/users.service';
import { CourseDurationService } from '../course-duration/courseDuration.service';
import { TimeSlotService } from '../timeslot/timeSlot.service';
import { UpdateBookingDto } from './dto/updateBooking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(CourseBooking)
    private readonly courseBookingRepository: Repository<CourseBooking>,
    private readonly courseService: CourseService,
    private readonly usersService: UsersService,
    private readonly courseDurationService: CourseDurationService,
    private readonly timeSlotService: TimeSlotService
  ) {}

  async create(createBookingDto: CreateBookingDto) {
    const { courseId, userId, courseDurationId, timeSlotId } = createBookingDto;
    const user = await this.usersService.findOne(userId);

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    const course = await this.courseService.findOne(courseId);
    if (!course) {
      throw new NotFoundException(`course with ID ${courseId} not found`);
    }
    const courseDuration = await this.courseDurationService.findOne(
      courseDurationId
    );
    if (!courseDuration) {
      throw new NotFoundException(
        `courseDuration with ID ${courseDurationId} not found`
      );
    }
    const timeSlot = await this.timeSlotService.findOne(timeSlotId);
    if (!timeSlot) {
      throw new NotFoundException(`timeSlot with ID ${timeSlotId} not found`);
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
    return this.courseBookingRepository.findOneBy({ id: id });
  }

  async update(id: string, updateBookingDto: UpdateBookingDto) {
    const existingBooking = await this.findOne(id);
    if (!existingBooking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    const course = updateBookingDto.courseId
      ? await this.courseService.findOne(updateBookingDto.courseId)
      : existingBooking.course;

    const user = updateBookingDto.userId
      ? await this.usersService.findOne(updateBookingDto.userId)
      : existingBooking.user;

    const duration = updateBookingDto.courseDurationId
      ? await this.courseDurationService.findOne(
          updateBookingDto.courseDurationId
        )
      : existingBooking.courseDuration;

    const timeSlot = updateBookingDto.timeSlotId
      ? await this.timeSlotService.findOne(updateBookingDto.timeSlotId)
      : existingBooking.timeSlot;

    existingBooking.course = course;
    existingBooking.user = user;
    existingBooking.courseDuration = duration;
    existingBooking.timeSlot = timeSlot;

    return await this.courseBookingRepository.save(existingBooking);
  }

  async remove(id: string) {
    const existingBooking = await this.findOne(id);

    if (!existingBooking) {
      return 'Resource not found';
    }

    await this.courseBookingRepository.remove(existingBooking);
  }
}
