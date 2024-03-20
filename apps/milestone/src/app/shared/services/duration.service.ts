import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIS } from 'apps/milestone/src/environments/api-routes';

@Injectable({
  providedIn: 'root'
})
export class DurationService {

  constructor(
    private http: HttpClient
  ) { }

  createCourseDuration(data: any) {
    return this.http.post<any>(APIS.durations.create, data);
  }

  getAllCourseDuration() {
    return this.http.get<any>(APIS.durations.create);
  }
}
