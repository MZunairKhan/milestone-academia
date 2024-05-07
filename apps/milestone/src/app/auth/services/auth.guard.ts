import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { StorageService } from '../../shared/services/storage.service';
import { AUTH_CONSTANTS } from '../auth.constants';

import { BaseRole } from '@milestone-academia/api-interfaces';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private router: Router,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.loggedIn$.pipe(
      map(isLoggedIn => {
        if (!isLoggedIn) {
          return this.router.createUrlTree(['/auth/login']);
        } else {
          return true;
        }
      })
    );
  }
  
}
