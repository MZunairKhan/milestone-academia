import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CourseRoutingModule } from './course-routing.module';

import { CoursesComponent } from './components/courses/courses.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { MyCoursesComponent } from './components/my-courses/my-courses.component';
import { CreateCourseComponent } from './components/create-course/create-course.component';
import { EvaluationComponent } from './components/evaluation/evaluation.component';
import { QuizViewComponent } from './components/quiz-view/quiz-view.component';

@NgModule({
  declarations: [
    CoursesComponent,
    CourseDetailsComponent,
    MyCoursesComponent,
    CreateCourseComponent,
    EvaluationComponent,
    QuizViewComponent
  ],
  imports: [CommonModule, SharedModule, CourseRoutingModule],
})
export class CourseModule {}
