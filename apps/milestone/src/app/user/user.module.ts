import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';

import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageUsersComponent } from './manage/manage-users/manage-users.component';
import { DashboardCoursesComponent } from './dashboard-courses/dashboard-courses.component';

@NgModule({
  declarations: [
    ProfileComponent,
    DashboardComponent,
    ManageUsersComponent,
    DashboardCoursesComponent,
  ],
  imports: [CommonModule, SharedModule, UserRoutingModule],
})
export class UserModule {}
