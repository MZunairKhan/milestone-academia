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
      const courseData = values[0];
      const assignedCourses: string[] = values[2].map((v: any) => v.course.id);

      this.timeSlots = values[1];
      this.studentsCourses = values[2];
      this.courseData = courseData.map((c: any) => ({...c, isAssigned: assignedCourses.includes(c.id)}));
    })
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
      const index = this.courseData.findIndex(c => c.id === this.selectedCourse.id);
      this.courseData[index].isAssigned = true;
      this.selectedCourse = null;
    })
  }
}
