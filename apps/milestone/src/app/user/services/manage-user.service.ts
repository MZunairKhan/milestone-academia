import { BehaviorSubject, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { USER_CONSTANTS } from '../constants/user.constants';
import { APIS } from 'apps/milestone/src/environments/api-routes';

import { UserData } from '../models/user.model';
import { CreatePersonUserDTOBase } from '@milestone-academia/api-interfaces';

@Injectable({
  providedIn: 'root'
})
export class ManageUserService {

  userListSource$: BehaviorSubject<UserData[]> = new BehaviorSubject<UserData[]>(
    [Object.create(USER_CONSTANTS.DEFAULT_USER_OBJECT)]
  );
  
  constructor(
    private http: HttpClient,
    // private storageService: StorageService,
  ) { }

  getUserList() {
    return this.http.get<UserData[]>(APIS.users.getAll)
      .pipe(
        tap((value: UserData[]) => this.updateUserList(value))
      )
  }

  addUser(requestBody: CreatePersonUserDTOBase) {
    return this.http.post<any>(APIS.users.createUser, requestBody)
      .pipe(
        tap((value: any) => console.log('manage user : createUser', requestBody))
      )
  }

  updateUserList(userList: UserData[]) {
    this.userListSource$.next(userList)
  }
}
