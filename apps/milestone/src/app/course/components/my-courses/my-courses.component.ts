import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '../../models/course.model';
import { sampleCourses } from '../../models/courses.sample';

@Component({
  selector: 'milestone-academia-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss'],
  host: {
    class:'milestone-router-component'
  }
})
export class MyCoursesComponent implements OnInit {
  allCourses: Course[] = sampleCourses.slice(0,6);
  recentCourse: Course[] = sampleCourses.slice(0,4);

  columns: 1 | 2 = 1;

  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {}
}
