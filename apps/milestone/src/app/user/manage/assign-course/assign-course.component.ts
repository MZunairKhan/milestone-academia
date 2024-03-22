import { FormBuilder, Validators } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DialogCloseConfig, DynamicDialogComponent } from '../../../shared/modules/dialog/models/dynamicDialogComponent';

import { CourseService } from '../../../course/services/course.service';
import { BookingService } from '../../../shared/services/booking.service';
import { DurationService } from '../../../shared/services/duration.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'milestone-academia-assign-course',
  templateUrl: './assign-course.component.html',
  styleUrls: ['./assign-course.component.scss'],
})
export class AssignCourseComponent implements OnInit, DynamicDialogComponent {
  
  courseData: any[] = [];
  timeSlots: any[] = [];
  studentsCourses: any[] = [];

  selectedCourse: any = null;

  data: any;
  @Output() close = new EventEmitter<DialogCloseConfig>();

  timeSlotForm = this.formBuilder.group({
    slot: ['', [Validators.required]],
  });
  
  constructor(
    private formBuilder: FormBuilder,
    private readonly courseService: CourseService,
    private readonly bookingService: BookingService,
    private readonly drationService: DurationService,
  ) {}

  ngOnInit(): void {

    forkJoin([
      this.courseService.getAllCourses(),
      this.drationService.getAllTimeslots(),
      this.bookingService.getOnSiteBookingsByStudentId(this.data.userData.userId)
    ]).subscribe(values => {
      this.courseData = values[0];
      console.log(this.courseData)
      
      this.timeSlots = values[1];
      console.log(this.timeSlots)
      
      this.studentsCourses = values[2];
      console.log(this.studentsCourses)
    })

    // this.courseService.getAllCourses().subscribe(data => {
    //   this.courseData = data;
    //   console.log(this.courseData)
    // });

    // this.drationService.getAllTimeslots().subscribe(data => {
    //   this.timeSlots = data;
    //   console.log(this.timeSlots)
    // });

    // this.bookingService.getOnSiteBookingsByStudentId(this.data.userData.userId)
  }

  selectCourse(course: any) {
    this.selectedCourse = course;
    console.log(this.selectedCourse);
  }

  assignCourse() {
    this.bookingService.createOnSiteBooking({
      courseId: this.selectedCourse.id,
      studentId: this.data.userData.userId,
      courseDurationId: this.selectedCourse.courseDuration.id
    }).subscribe(value => {
      console.log(value)
      this.selectedCourse = null;
    })
  }
}
