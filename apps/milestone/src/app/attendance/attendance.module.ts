import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { AddAttendanceComponent } from './add-attendance/add-attendance.component';

@NgModule({
  declarations: [AddAttendanceComponent],
  imports: [CommonModule, SharedModule, AttendanceRoutingModule],
})
export class AttendanceModule {}
