import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '../../models/course.model';
import { sampleCourses } from '../../models/courses.sample';
import { RoleService } from '../../../auth/services/role.service';
import { CourseRoles } from '@milestone-academia/api-interfaces';
import { CourseService } from '../../services/course.service';
import { UserService } from '../../../user/services/user.service';
import { StorageService } from '../../../shared/services/storage.service';

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
  isInstructor$ = this.roleService.isInstructor$;

  constructor(
    private router: Router,
    private userService: UserService,
    private roleService: RoleService,
    private courseService: CourseService,
    private storageService: StorageService,
  ) {}

  get displayCreateCourse() {
    return this.roleService.checkRoles([CourseRoles.CreateCourse]);
  }

  ngOnInit(): void {
    this.isStudent$.subscribe(isStudent => {
      if (isStudent) {
        this.getLoggedInUserCourses()
      } else {
        this.getInstructorCourse()
      }
    })
  }
  
  getLoggedInUserCourses(){
    const userData = this.storageService.getValue('userData');
    this.courseService.getCoursesByUserId(userData.userId)
    .subscribe((value: any) => {
      console.log(value);
      this.allCourses = value.map((v: any) => v.course);
    });
  }

  getInstructorCourse() {
    const userData = this.storageService.getValue('userData');
    this.userService.getInstructorById(userData.instructorData.id)
    .subscribe((value: any) => {
      console.log(value.courses);
      this.allCourses = value.courses;
    });
  }

  goToRoute(route: string) {
    this.router.navigate([route]);
  }

  openCourseDetails = (data: Course) => this.goToRoute(`course/details/${data.id}`);

  openCourseAttendance = (data: Course) => this.goToRoute(`attendance/${data.id}/add`);

  openStudentAttendance(data: Course) {
    const userData = this.storageService.getValue('userData');
    this.goToRoute(`attendance/${data.id}/student/${userData.studentData.id}`);
  }
}
