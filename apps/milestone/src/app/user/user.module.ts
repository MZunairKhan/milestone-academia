import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { DashboardCoursesComponent } from './dashboard-courses/dashboard-courses.component';
import { UserInformationComponent } from './profile/user-information/user-information.component';
import { StudentInformationComponent } from './profile/student-information/student-information.component';
import { TeacherInformationComponent } from './profile/teacher-information/teacher-information.component';
import { ManageUsersComponent } from './manage/manage-users/manage-users.component';

@NgModule({
  declarations: [
    ProfileComponent,
    DashboardComponent,
    UserInformationComponent,
    DashboardCoursesComponent,
    StudentInformationComponent,
    TeacherInformationComponent,
    ManageUsersComponent,
  ],
  imports: [CommonModule, SharedModule, UserRoutingModule],
})
export class UserModule {}
