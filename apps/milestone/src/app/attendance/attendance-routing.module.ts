import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/services/auth.guard';
import { AddAttendanceComponent } from './add-attendance/add-attendance.component';

const routes: Routes = [
  { path: ':id/add', component: AddAttendanceComponent, canActivate: [AuthGuard]}//, data: {roles: [UserRoles.RetrieveUser]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceRoutingModule { }