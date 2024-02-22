import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { MyCoursesComponent } from './components/my-courses/my-courses.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: CoursesComponent },
  { path: 'my-courses', component: MyCoursesComponent },
  { path: 'details/:id', component: CourseDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }