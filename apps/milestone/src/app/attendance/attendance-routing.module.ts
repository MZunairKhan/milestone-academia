import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/services/auth.guard';
import { AddAttendanceComponent } from './components/add-attendance/add-attendance.component';
import { StudentAttendanceComponent } from './components/student-attendance/student-attendance.component';

const routes: Routes = [
  { path: ':id/add', component: AddAttendanceComponent, canActivate: [AuthGuard]},//, data: {roles: [UserRoles.RetrieveUser]},
  { path: ':id/student/:studentId', component: StudentAttendanceComponent, canActivate: [AuthGuard]}//, data: {roles: [UserRoles.RetrieveUser]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceRoutingModule { }