import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';

import { StorageService } from './storage.service';
import { APIS } from '../../../environments/api-routes';

import { UserData } from '../models/auth.models';
import { AUTH_CONSTANTS } from '../auth.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: UserData = Object.create(AUTH_CONSTANTS.STORAGE.DEFAULT_USER_OBJECT);

  userSource$: BehaviorSubject<UserData> = new BehaviorSubject<UserData>(this.userData)
  
  loggedIn$: Observable<boolean> = this.userSource$.asObservable()
  .pipe(
    map(value => {
      const userData: UserData | null = 
        value.username ? value : this.storageService.getValue(AUTH_CONSTANTS.STORAGE.USER_DATA);
      return userData?.username ? true : false;
    })
  );

  constructor(
    private router: Router,
    private http: HttpClient,
    private storageService: StorageService,
  ) {
  }

  login(userName: string, password: string) {  
    this.http.post<UserData>(APIS.auth.login, {userName, password})
    .subscribe(value => {
      this.updateData(value);
      this.storageService.setValue(AUTH_CONSTANTS.STORAGE.USER_DATA, value);
      this.goToDashboard();
    })
  }

  logout() {
    this.userSource$.next(this.userData);
    this.goToLogout();
  }
  
  private updateData(value: UserData) {
    this.userSource$.next(value);
  }

  private goToDashboard() {
    this.router.navigate(['user/dashboard']);
  }

  private goToLogout() {
    this.router.navigate(['auth/logout']);
  }
}
