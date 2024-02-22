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

  authSource$: BehaviorSubject<AuthData> = new BehaviorSubject<AuthData>(
    Object.create(AUTH_CONSTANTS.STORAGE.DEFAULT_AUTH_OBJECT)
  );

  authData$: Observable<AuthData> = this.authSource$.asObservable()
  .pipe(
    map((value: AuthData) => {
      const userData: AuthData = 
        value?.upn ? value : this.storageService.getValue(AUTH_CONSTANTS.STORAGE.AUTH_DATA);
      return userData;
    })
  );
  
  loggedIn$: Observable<boolean> = this.authSource$.asObservable()
  .pipe(
    map(value => {
      const userData: AuthData | null = 
        value.upn ? value : this.storageService.getValue(AUTH_CONSTANTS.STORAGE.AUTH_DATA);
      return userData?.upn ? true : false;
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
      this.routeTo('user/dashboard');
    })
  }

  logout() {
    this.storageService.removeValue(AUTH_CONSTANTS.STORAGE.AUTH_DATA);
    this.authSource$.next(Object.create(AUTH_CONSTANTS.STORAGE.DEFAULT_AUTH_OBJECT));
    this.routeTo('auth/logout');
  }
  
  private updateData(value: AuthData) {
    this.authSource$.next(value);
  }

  routeTo(route: string) {
    this.router.navigate([route]);
  }
}
