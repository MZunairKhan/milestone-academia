import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CourseRoutingModule } from './course-routing.module';

import { CoursesComponent } from './courses/courses.component';

@NgModule({
  declarations: [
    CoursesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CourseRoutingModule
  ],
})
export class CourseModule {}
