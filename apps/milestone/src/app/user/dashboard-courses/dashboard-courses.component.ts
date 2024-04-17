import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../course/services/course.service';

@Component({
  selector: 'milestone-dashboard-courses',
  templateUrl: './dashboard-courses.component.html',
  styleUrls: ['./dashboard-courses.component.scss'],
})
export class DashboardCoursesComponent implements OnInit {
  constructor(
    private courseService: CourseService,
  ) {}

  ngOnInit(): void {
    this.courseService.UserCourses$.subscribe(v => console.log(v))
  }
}
