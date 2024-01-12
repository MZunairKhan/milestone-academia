import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardCoursesComponent } from './dashboard-courses/dashboard-courses.component';

@NgModule({
  declarations: [DashboardComponent, DashboardCoursesComponent],
  imports: [CommonModule, SharedModule, UserRoutingModule],
})
export class UserModule {}
