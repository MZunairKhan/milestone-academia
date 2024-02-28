import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { MyCoursesComponent } from './components/my-courses/my-courses.component';
import { AuthGuard } from '../auth/services/auth.guard';
import { CourseRoles } from '@milestone-academia/api-interfaces';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: CoursesComponent, canActivate: [AuthGuard], data: {roles: [CourseRoles.RetrieveCourse]} },
  { path: 'my-courses', component: MyCoursesComponent, canActivate: [AuthGuard], data: {roles: [CourseRoles.RetrieveCourse]}  },
  { path: 'details/:id', component: CourseDetailsComponent, canActivate: [AuthGuard], data: {roles: [CourseRoles.RetrieveCourse]}  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }