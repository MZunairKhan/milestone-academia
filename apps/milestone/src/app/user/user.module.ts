import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';

import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageUsersComponent } from './manage/manage-users/manage-users.component';
import { DashboardCoursesComponent } from './dashboard-courses/dashboard-courses.component';
import { AddUserComponent } from './manage/add-user/add-user.component';
import { UserInfoComponent } from './manage/user-info/user-info.component';

@NgModule({
  declarations: [
    ProfileComponent,
    DashboardComponent,
    ManageUsersComponent,
    DashboardCoursesComponent,
    AddUserComponent,
    UserInfoComponent,
  ],
  imports: [CommonModule, SharedModule, UserRoutingModule],
})
export class UserModule {}
