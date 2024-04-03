import { FormBuilder, Validators } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DialogCloseConfig, DynamicDialogComponent } from '../../../shared/modules/dialog/models/dynamicDialogComponent';

import { CourseService } from '../../../course/services/course.service';
import { BookingService } from '../../../booking/booking.service';
import { DurationService } from '../../../shared/services/duration.service';
import { forkJoin } from 'rxjs';
import { UserType } from '@milestone-academia/api-interfaces';
import { ManageUserService } from '../../services/manage-user.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'milestone-academia-assign-course',
  templateUrl: './assign-course.component.html',
  styleUrls: ['./assign-course.component.scss'],
})
export class AssignCourseComponent implements OnInit, DynamicDialogComponent {
  
  timeSlots: any[] = [];
  courseData: any[] = [];

  selectedCourse: any = null;

  data: any;
  currentUserData: any;
  @Output() close = new EventEmitter<DialogCloseConfig>();

  timeSlotForm = this.formBuilder.group({
    slot: ['', [Validators.required]],
  });
  
  constructor(
    private formBuilder: FormBuilder,
    private readonly userService: UserService,
    private readonly courseService: CourseService,
    private readonly bookingService: BookingService,
    private readonly drationService: DurationService,
    private readonly manageUserService: ManageUserService,
  ) {}

  ngOnInit(): void {
    if (this.data.userData.userType === UserType.Student) {
      this.getDataForStudent();
    } else if (this.data.userData.userType === UserType.Instructor) {
      this.getDataForInstructor();
    }
  }

  getDataForStudent() {
    forkJoin([
      this.courseService.getAllCourses(),
      this.drationService.getAllTimeslots(),
      this.bookingService.getOnSiteBookingsByStudentId(this.data.userData.userId)
    ]).subscribe(values => {
      const courseData = values[0];
      const assignedCourses: string[] = values[2].map((v: any) => v.course.id);

      this.timeSlots = values[1];
      this.courseData = courseData.map((c: any) => ({...c, isAssigned: assignedCourses.includes(c.id)}));
    })
  }

  getDataForInstructor() {
    forkJoin([
      this.userService.getUserDataById(this.data.userData.userId),
      this.courseService.getAllCourses(),
      this.drationService.getAllTimeslots(),
    ]).subscribe(values => {
      this.currentUserData = values[0];
      const courseData = values[1];
      const assignedCourses: string[] = this.currentUserData.instructorData.courses.map((v: any) => v.id);

      this.timeSlots = values[2];
      this.courseData = courseData.map((c: any) => ({...c, isAssigned: assignedCourses.includes(c.id)}));
    })
  }

  selectCourse = (course: any) => this.selectedCourse = course;

  assignCourse() {
    if (this.data.userData.userType === UserType.Student) {
      this.assignOnSiteBooking();
    } else if (this.data.userData.userType === UserType.Instructor) {
      this.assignCourseToInstructor()
    }
  }

  assignOnSiteBooking() {
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

  assignCourseToInstructor() {
    this.manageUserService.assignCourseToInstructor(
      this.currentUserData.instructorData.id,
      this.selectedCourse.id
    ).subscribe(value => {
      const index = this.courseData.findIndex(c => c.id === this.selectedCourse.id);
      this.courseData[index].isAssigned = true;
      this.selectedCourse = null;
    })
  }
}
