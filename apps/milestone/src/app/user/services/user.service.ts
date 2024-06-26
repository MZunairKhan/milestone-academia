import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { APIS } from 'apps/milestone/src/environments/api-routes';

import { StudentData, UserData } from '../models/user.model';
import { USER_CONSTANTS } from '../constants/user.constants';
import { StorageService } from '../../shared/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userSource$: BehaviorSubject<UserData> = new BehaviorSubject<UserData>(
    Object.create(USER_CONSTANTS.DEFAULT_USER_OBJECT)
  );

  userData$: Observable<UserData> = this.userSource$.asObservable()
  .pipe(
    map((value: UserData) => {
      const userData: UserData = 
        value?.userName ? value : this.storedUserData;
      return userData;
    })
  );

  studentData$: Observable<StudentData> = this.userSource$.asObservable()
  .pipe(
    map((value: UserData) => {
      const userData: UserData = 
        value?.userName ? value : this.storedUserData;
      return userData.userType === 'Student' ? userData.studentData : {};
    })
  );

  isStudent$: Observable<boolean> = this.userSource$.asObservable()
  .pipe(
    map((value: UserData) => {
      const userData: UserData = 
        value?.userName ? value : this.storedUserData;
      return userData.userType === 'Student';
    })
  );
  
  constructor(
    private http: HttpClient,
    private storageService: StorageService,
  ) { }

  get storedUserData() {
    return this.storageService.getValue(USER_CONSTANTS.USER_DATA);
  }

  get currentUser() {
    if (this.userSource$.value.email) {
      return this.userSource$.value;
    }

    this.userSource$.next(this.storedUserData);
    return this.storedUserData;
  }

  getUserData() {
    return this.http.get<UserData>(APIS.users.getUserData)
      .pipe(
        tap((value: UserData) => this.updateUserData(value))
      )
  }

  getUserDataById(id: string) {
    return this.http.get<UserData>(APIS.users.getById(id))
  }

  deleteUserById(id: string) {
    return this.http.delete(APIS.users.deleteById(id))
  }

  createStudentUser(data: any) {
    return this.http.post<UserData>(APIS.users.createStudent, data)
  }

  getInstructorById(instructorId: string) {
    return this.http.get<UserData>(APIS.users.getInstructorById(instructorId));
  }

  private updateUserData(value: UserData) {
    this.storageService.setValue(USER_CONSTANTS.USER_DATA, value);
    this.userSource$.next(value);
  }
}
