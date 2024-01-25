import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardCoursesComponent } from './dashboard-courses/dashboard-courses.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { CreateStudentComponent } from './create-student/create-student.component';
import { UserInformationComponent } from './profile/user-information/user-information.component';
import { StudentInformationComponent } from './profile/student-information/student-information.component';
import { TeacherInformationComponent } from './profile/teacher-information/teacher-information.component';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardCoursesComponent,
    ProfileComponent,
    CreateStudentComponent,
    UserInformationComponent,
    StudentInformationComponent,
    TeacherInformationComponent,
  ],
  imports: [CommonModule, SharedModule, UserRoutingModule],
})
export class UserModule {}
