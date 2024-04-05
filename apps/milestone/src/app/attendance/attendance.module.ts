import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { AddAttendanceComponent } from './components/add-attendance/add-attendance.component';
import { StudentAttendanceComponent } from './components/student-attendance/student-attendance.component';

@NgModule({
  declarations: [
    AddAttendanceComponent,
    StudentAttendanceComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AttendanceRoutingModule
  ],
})
export class AttendanceModule {}
