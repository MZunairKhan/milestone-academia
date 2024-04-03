import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { APIS } from 'apps/milestone/src/environments/api-routes';

import { StorageService } from '../../shared/services/storage.service';
import { CreateAttedanceDTOBase } from '@milestone-academia/api-interfaces';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  // userSource$: BehaviorSubject<UserData> = new BehaviorSubject<UserData>(
  //   Object.create(USER_CONSTANTS.DEFAULT_USER_OBJECT)
  // );

  // userData$: Observable<UserData> = this.userSource$.asObservable()
  // .pipe(
  //   map((value: UserData) => {
  //     const userData: UserData = 
  //       value?.userName ? value : this.storedUserData;
  //     return userData;
  //   })
  // );

  // studentData$: Observable<StudentData> = this.userSource$.asObservable()
  // .pipe(
  //   map((value: UserData) => {
  //     const userData: UserData = 
  //       value?.userName ? value : this.storedUserData;
  //     return userData.userType === 'Student' ? userData.studentData : {};
  //   })
  // );

  // isStudent$: Observable<boolean> = this.userSource$.asObservable()
  // .pipe(
  //   map((value: UserData) => {
  //     const userData: UserData = 
  //       value?.userName ? value : this.storedUserData;
  //     return userData.userType === 'Student';
  //   })
  // );
  
  constructor(
    private http: HttpClient,
    private storageService: StorageService,
  ) { }

  createAttendance(body: CreateAttedanceDTOBase) {
    return this.http.post<any>(APIS.attendance.create, body);
  }

  getByInstructorCourseStudent(instructorId: string, courseId: string, studentId: string) {
    return this.http.get<any>(APIS.attendance.getByInstructorCourseStudent(instructorId, courseId, studentId));
  }

  getByInstructorCourse(instructorId: string, courseId: string) {
    return this.http.get<any>(APIS.attendance.getByInstructorCourse(instructorId, courseId));
  }

}
