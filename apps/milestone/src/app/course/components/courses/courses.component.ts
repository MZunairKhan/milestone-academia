import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '../../models/course.model';
import { sampleCourses } from '../../models/courses.sample';

@Component({
  selector: 'milestone-academia-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  host: {
    class:'milestone-router-component'
  }
})
export class CoursesComponent implements OnInit {
  tiles: Course[] = sampleCourses;

  columns: 1 | 2 = 1;

  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {}

  buttonToggled = (value: any) => this.columns = value

  openDetails = (data: Course) => this.router.navigate([`course/details/${data.id}`])
}
