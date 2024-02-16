import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CourseRoutingModule } from './course-routing.module';

import { CoursesComponent } from './components/courses/courses.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';

@NgModule({
  declarations: [CoursesComponent, CourseDetailsComponent],
  imports: [CommonModule, SharedModule, CourseRoutingModule],
})
export class CourseModule {}
