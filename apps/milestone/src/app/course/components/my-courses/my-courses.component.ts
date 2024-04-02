import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '../../models/course.model';
import { sampleCourses } from '../../models/courses.sample';
import { RoleService } from '../../../auth/services/role.service';
import { CourseRoles } from '@milestone-academia/api-interfaces';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'milestone-academia-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss'],
  host: {
    class: 'milestone-router-component',
  },
})
export class MyCoursesComponent implements OnInit {
  allCourses: Course[];
  recentCourse: Course[] = sampleCourses.slice(0, 4);
  columns: 1 | 2 = 1;
  isStudent$ = this.roleService.isStudent$;

  constructor(
    private router: Router,
    private roleService: RoleService,
    private courseService: CourseService
  ) {}

  get displayCreateCourse() {
    return this.roleService.checkRoles([CourseRoles.CreateCourse]);
  }

  ngOnInit(): void {
   this.getLoggedInUserCourses()
  }
  
  getLoggedInUserCourses(){
    const uid : any = localStorage.getItem('userData');
    const parsedData = JSON.parse(uid);
    const userId = parsedData.userId;
    this.courseService
    .getCoursesByUserId(userId)
    .subscribe((value: any) => {
      console.log(value);
      this.allCourses = value.map((v: any) => v.course);
    });

  }

  goToRoute(route: string) {
    this.router.navigate([route]);
  }

  openEvaluations = () =>
    this.router.navigate([`course/my-courses/evaluation`]);
  openCourseDetails = (data: Course) =>
    this.router.navigate([`course/details/${data.id}`]);
}
