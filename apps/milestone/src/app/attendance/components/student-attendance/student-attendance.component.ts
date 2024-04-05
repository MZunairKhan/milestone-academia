import { Component, OnDestroy, OnInit } from '@angular/core';
import { AttendanceService } from '../../services/attendance.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AttendanceStatus } from '@milestone-academia/api-interfaces';

@Component({
  selector: 'milestone-academia-student-attendance',
  templateUrl: './student-attendance.component.html',
  styleUrls: ['./student-attendance.component.scss'],
  host: {
    class:'milestone-router-component'
  }
})
export class StudentAttendanceComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;
  summary = {
    present: [],
    absent: [],
    leave: []
  }
  
  constructor(
    private route: ActivatedRoute,
    private readonly attendanceService: AttendanceService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => 
      this.getAttendance(params['id'], params['studentId'])
    );
  }
  
  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getAttendance(courseId: string, studentId: string) {
    this.attendanceService.getByStudentCourse(courseId, studentId)
    .subscribe(data =>
      this.summary = {
        present: data.filter((v: any) => v.attendanceStatus === AttendanceStatus.Present),
        absent: data.filter((v: any) => v.attendanceStatus === AttendanceStatus.Absent),
        leave: data.filter((v: any) => v.attendanceStatus === AttendanceStatus.Leave)
      }
    )
  }
}
