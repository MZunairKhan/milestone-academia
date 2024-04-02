import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIS } from 'apps/milestone/src/environments/api-routes';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(
    private http: HttpClient
  ) { }

  createOnSiteBooking(data: any) {
    return this.http.post<any>(APIS.onsiteCourseBooking.create, data);
  }

  getAllOnSiteBookings() {
    return this.http.get<any>(APIS.onsiteCourseBooking.getAll);
  }

  getOnSiteBookingsByStudentId(id: string) {
    return this.http.get<any>(APIS.onsiteCourseBooking.getByStudentId(id));
  }

  getOnSiteBookingsByCourseId(id: string) {
    return this.http.get<any>(APIS.onsiteCourseBooking.getByCourseId(id));
  }
}
