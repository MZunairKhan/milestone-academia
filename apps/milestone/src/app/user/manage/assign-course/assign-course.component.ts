import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DialogCloseConfig, DynamicDialogComponent } from '../../../shared/modules/dialog/models/dynamicDialogComponent';
import { CourseService } from '../../../course/services/course.service';

@Component({
  selector: 'milestone-academia-assign-course',
  templateUrl: './assign-course.component.html',
  styleUrls: ['./assign-course.component.scss'],
})
export class AssignCourseComponent implements OnInit, DynamicDialogComponent {
  
  courseData: any[] = []
  @Output() close = new EventEmitter<DialogCloseConfig>();
  
  constructor(
    private readonly courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe(data => {
      this.courseData = data;
      console.log(this.courseData)
    });
  }
}
