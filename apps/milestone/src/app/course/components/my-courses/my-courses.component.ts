import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '../../models/course.model';
import { sampleCourses } from '../../models/courses.sample';
import { RoleService } from '../../../auth/services/role.service';
import { CourseRoles } from '@milestone-academia/api-interfaces';

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
  isStudent$ = this.roleService.isStudent$;

  constructor(
    private router: Router,
    private roleService: RoleService,
  ) {}

  get displayCreateCourse() {
    return this.roleService.checkRoles([CourseRoles.CreateCourse]);
  }

  ngOnInit(): void {}

  goToRoute(route: string) {
    this.router.navigate([route]);
  }
}
