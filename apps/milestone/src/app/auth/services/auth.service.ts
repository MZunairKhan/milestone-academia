import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';

import { StorageService } from '../../shared/services/storage.service';
import { APIS } from '../../../environments/api-routes';

import { AUTH_CONSTANTS } from '../auth.constants';
import { AuthData } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authData: AuthData = Object.create(AUTH_CONSTANTS.STORAGE.DEFAULT_AUTH_OBJECT);

  authSource$: BehaviorSubject<AuthData> = new BehaviorSubject<AuthData>(this.authData)
  
  loggedIn$: Observable<boolean> = this.authSource$.asObservable()
  .pipe(
    map(value => {
      const userData: AuthData | null = 
        value.username ? value : this.storageService.getValue(AUTH_CONSTANTS.STORAGE.AUTH_DATA);
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
    this.http.post<AuthData>(APIS.auth.login, {userName, password})
    .subscribe(value => {
      this.updateData(value);
      this.storageService.setValue(AUTH_CONSTANTS.STORAGE.AUTH_DATA, value);
      this.goToDashboard();
    })
  }

  logout() {
    this.storageService.removeValue(AUTH_CONSTANTS.STORAGE.AUTH_DATA);
    this.authSource$.next(this.authData);
    this.goToLogout();
  }
  
  private updateData(value: AuthData) {
    this.authSource$.next(value);
  }

  private goToDashboard() {
    this.router.navigate(['user/dashboard']);
  }

  goToLogin() {
    this.router.navigate(['auth/login']);
  }

  private goToLogout() {
    this.router.navigate(['auth/logout']);
  }
}
