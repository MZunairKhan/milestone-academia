import { BehaviorSubject, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

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

  getUserList(userType?: string, presenceType?: string, userName?: string, page?: number, limit?: number) {
    let params = new HttpParams();
    if (userType) {
      params = params.set('userType', userType);
    }
    if (presenceType) {
      params = params.set('presenceType', presenceType);
    }
    if (userName) {
      params = params.set('username', userName);
    }
    if (page) {
      params = params.set('page', page);
    }
    if (limit) {
      params = params.set('limit', limit);
    }

    return this.http.get<any>(APIS.users.getAll, {params})
      .pipe(        
        tap((value: any) => this.updateUserList(value.users))
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
