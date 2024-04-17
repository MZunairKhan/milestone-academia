import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { UserData } from '../models/user.model';

import { UserService } from '../services/user.service';
import { RoleService } from '../../auth/services/role.service';
import { CourseService } from '../../course/services/course.service';
import { StorageService } from '../../shared/services/storage.service';
import { UserType } from '@milestone-academia/api-interfaces';

@Component({
  selector: 'milestone-academia-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  host: {
    class:'milestone-router-component'
  }
})
export class DashboardComponent implements OnInit {

  user$: Observable<UserData> = this.userService.userData$;
  userType$ = this.roleService.userType$;

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private courseService: CourseService,
    private storageService: StorageService,
  ) {}

  ngOnInit(): void {
    this.userService.getUserData()
    .subscribe((userData: UserData) => {
      console.log("userData", userData)
    });
    this.getUserCourses();
  }

  getUserCourses() {
    this.userType$.subscribe(type => {
      const userData = this.storageService.getValue('userData');

      if (type === UserType.Student) {
        this.getLoggedInUserCourses(userData.userId);
      } else if (type === UserType.Instructor) {
        this.getInstructorCourse(userData.instructorData.id);
      }
    })
  }
  
  getLoggedInUserCourses(id: string) {
    this.courseService.getCoursesByUserId(id)
    .subscribe((value: any) =>
      this.courseService.UserCoursesSources$.next(value.map((v: any) => v.course))
    );
  }

  getInstructorCourse(id: string) {
    this.userService.getInstructorById(id)
    .subscribe((value: any) =>
      this.courseService.UserCoursesSources$.next(value.courses)
    );
  }
}
