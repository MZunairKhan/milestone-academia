import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/services/auth.guard';
import { CourseRoles } from '@milestone-academia/api-interfaces';

import { CoursesComponent } from './components/courses/courses.component';
import { MyCoursesComponent } from './components/my-courses/my-courses.component';
import { CreateCourseComponent } from './components/create-course/create-course.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: CoursesComponent, canActivate: [AuthGuard], data: {roles: [CourseRoles.RetrieveCourse]} },
  { path: 'create', component: CreateCourseComponent, canActivate: [AuthGuard], data: {roles: [CourseRoles.CreateCourse]}  },
  { path: 'my-courses', component: MyCoursesComponent, canActivate: [AuthGuard], data: {roles: [CourseRoles.RetrieveCourse]}  },
  { path: 'details/:id', component: CourseDetailsComponent, canActivate: [AuthGuard], data: {roles: [CourseRoles.RetrieveCourse]}  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }