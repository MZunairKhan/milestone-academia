import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { APIS } from 'apps/milestone/src/environments/api-routes';

import { CreateCourseDTOBase } from '@milestone-academia/api-interfaces';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  userSource$: BehaviorSubject<any> = new BehaviorSubject<any>({}
    // Object.create(USER_CONSTANTS.DEFAULT_USER_OBJECT)
  );

  userData$: Observable<any> = this.userSource$.asObservable()
  .pipe(
    map((value: any) => {
      const userData: any = 
        value?.userName ? value : {};
      return userData;
    })
  );

  studentData$: Observable<any> = this.userSource$.asObservable()
  .pipe(
    map((value: any) => {
      const userData: any = 
        value?.userName ? value : {};
      return userData.userType === 'Student' ? userData.studentData : {};
    })
  );

  isStudent$: Observable<boolean> = this.userSource$.asObservable()
  .pipe(
    map((value: any) => {
      const userData: any = 
        value?.userName ? value : {};
      return userData.userType === 'Student';
    })
  );
  
  constructor(
    private http: HttpClient,
  ) { }

  getAllCourse() {
    return this.http.get<any>(APIS.course.getAll)
  }

  getCourseById(id: string) {
    return this.http.get<any>(APIS.course.getById(id))
  }

  deleteCourseById(id: string) {
    return this.http.delete(APIS.course.deleteById(id))
  }

  createCourse(data: CreateCourseDTOBase) {
    return this.http.post<any>(APIS.course.create, data)
  }

  private updateUserData(value: any) {
    this.userSource$.next(value);
  }
}
