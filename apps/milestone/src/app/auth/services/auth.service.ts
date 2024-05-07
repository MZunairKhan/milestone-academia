import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';

import { APIS } from '../../../environments/api-routes';
import { StorageService } from '../../shared/services/storage.service';

import { AUTH_CONSTANTS } from '../auth.constants';
import { USER_CONSTANTS } from '../../user/constants/user.constants';
import { InternalAuthData } from '@milestone-academia/api-interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authSource$: BehaviorSubject<InternalAuthData> = new BehaviorSubject<InternalAuthData>(
    Object.create(AUTH_CONSTANTS.STORAGE.DEFAULT_AUTH_OBJECT)
  );

  authData$: Observable<InternalAuthData> = this.authSource$.asObservable()
  .pipe(
    map((value: InternalAuthData) => {
      const userData: InternalAuthData = 
        value?.upn ? value : this.storageService.getValue(AUTH_CONSTANTS.STORAGE.AUTH_DATA);
      return userData;
    })
  );
  
  loggedIn$: Observable<boolean> = this.authSource$.asObservable()
  .pipe(
    map(value => {
      const userData: InternalAuthData | null = 
        value.upn ? value : this.storageService.getValue(AUTH_CONSTANTS.STORAGE.AUTH_DATA);
      return userData?.upn ? true : false;
    })
  );

  constructor(
    private router: Router,
    private http: HttpClient,
    private storageService: StorageService,

  ) {
    this.checkAndInvalidateUser();
  }

  getUserRoles() {  
    this.http.get<string[]>(APIS.auth.roleSet , { withCredentials: true })
    .subscribe(value => {
      console.log(AUTH_CONSTANTS.STORAGE.ROLES, value);
      this.storageService.setValue(AUTH_CONSTANTS.STORAGE.ROLES, value);
    })
  }

  handleSuccessfullLogin(value:any){
    this.updateAuthData(value);
    this.storageService.setValue(AUTH_CONSTANTS.STORAGE.AUTH_DATA, value);
    this.getUserRoles();
  }

  onSuccessFullLogin(value : any){
    this.updateAuthData(value);
    this.storageService.setValue(AUTH_CONSTANTS.STORAGE.AUTH_DATA, value);
    this.getUserRoles();
    this.routeTo('user/dashboard');
  }

  login(userName: string, password: string) {  
    return this.http.post(APIS.auth.login, {userName, password}, { withCredentials: true })
  }
  refreshToken(refresh:any) {  
    return this.http.post(APIS.auth.refreshToken, {refresh})
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(APIS.users.forgotPassword, { email });
  }

  logout() {
    this.removeUserData();
    localStorage.clear()
    this.routeTo('auth/logout');
  }

  routeTo(route: string) {
    this.router.navigate([route]);
  }

  private checkAndInvalidateUser() {
    const authData = this.storageService.getValue(AUTH_CONSTANTS.STORAGE.AUTH_DATA);
    if (authData) {
      if (Date.now() >= authData.exp * 1000) {
        this.removeUserData();
      }
    }
  }

  private removeUserData() {
    this.storageService.removeValue(AUTH_CONSTANTS.STORAGE.AUTH_DATA);
    this.storageService.removeValue(USER_CONSTANTS.USER_DATA);
    this.storageService.removeValue(AUTH_CONSTANTS.STORAGE.ROLES);
    this.authSource$.next(Object.create(AUTH_CONSTANTS.STORAGE.DEFAULT_AUTH_OBJECT));
  }
  
  public updateAuthData(value: InternalAuthData) {
    this.authSource$.next(value);
  }

  currentUserRoles() {
    return this.storageService.getValue(AUTH_CONSTANTS.STORAGE.ROLES);
  }
}
