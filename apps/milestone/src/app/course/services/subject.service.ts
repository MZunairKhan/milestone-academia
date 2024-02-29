import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { APIS } from 'apps/milestone/src/environments/api-routes';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

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

  getAllSubjects() {
    return this.http.get<any>(APIS.subject.getAll)
  }

  getSubjectById(id: string) {
    return this.http.get<any>(APIS.subject.getById(id))
  }

  deleteSubjectById(id: string) {
    return this.http.delete(APIS.subject.deleteById(id))
  }

  createSubject(data: any) {
    return this.http.post<any>(APIS.subject.create, data)
  }

  private updateUserData(value: any) {
    this.userSource$.next(value);
  }
}
