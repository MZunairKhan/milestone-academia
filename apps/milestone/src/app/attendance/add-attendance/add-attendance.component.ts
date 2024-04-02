import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AttendanceStatus } from '@milestone-academia/api-interfaces';

import { BookingService } from '../../booking/booking.service';
import { AttendanceService } from '../services/attendance.service';

@Component({
  selector: 'milestone-academia-add-attendance',
  templateUrl: './add-attendance.component.html',
  styleUrls: ['./add-attendance.component.scss'],
  host: {
    class:'milestone-router-component'
  }
})
export class AddAttendanceComponent implements OnInit {
  today = new Date();
  bookingData: any[] = []
  attendanceValues = [AttendanceStatus.Present, AttendanceStatus.Absent, AttendanceStatus.Leave]

  attendanceDateForm = this.formBuilder.group({});
  attendanceForm = this.formBuilder.group({});

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly bookingService: BookingService,
    private readonly attendanceService: AttendanceService
  ) {
  }

  ngOnInit(): void {
    this.attendanceDateForm.valueChanges.subscribe(v => console.log(v));
    this.getCourseBookings();
  }

  getCourseBookings() {
    this.bookingService.getOnSiteBookingsByCourseId('fe4c77ba-d2a2-47ef-ac22-fd8707dedd1a').subscribe((v: any) => {
      this.attendanceDateForm = this.formBuilder.group({});
      console.log(v);
      this.bookingData = [...v, ...v];
      this.bookingData.map(b => {
        this.attendanceDateForm.addControl(b.id, new FormControl(new Date(), Validators.required));
        this.attendanceForm.addControl(b.id, new FormControl(AttendanceStatus.Present, Validators.required));
      })
      console.log(this.attendanceDateForm)
    })
  }

  submitAttendance(id: string) {
    const dateValues = Object.create(this.attendanceDateForm.value);
    const attendanceValues = Object.create(this.attendanceForm.value);

    this.attendanceService.createAttendance({
      OnSiteCourseBooking: id,
      attendanceStatus: attendanceValues[id],
      date: dateValues[id]
    }).subscribe(v => console.log(v));
  }
}
