import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { APIS } from '../../environments/api-routes';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { UserData } from './models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData = {
    sub: '',
    upn: '',
    userType: '',
    username: ''
  }

  userSource$: BehaviorSubject<UserData> = new BehaviorSubject<UserData>(this.userData)
  
  loggedIn$: Observable<boolean> = this.userSource$.asObservable()
  .pipe(
    map(value => value.username ? true : false)
  );

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

  login(userName: string, password: string) {  
    this.http.post<UserData>(APIS.auth.login, {userName, password})
    .subscribe(value => {
      this.updateData(value)
      this.goToDashboard();
      console.log(this.userSource$.value)
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
