import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../../shared/services/storage.service';
import { AUTH_CONSTANTS } from '../auth.constants';

import { BaseRole } from '@milestone-academia/api-interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private storageService: StorageService,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    const roles: string[] = route.data['roles'] as Array<string> ?? [];
    const userRoles: string[] = this.storageService.getValue(AUTH_CONSTANTS.STORAGE.ROLES);

    const shouldRoute = roles.every(role => userRoles.includes(role))
    
    console.log(route.routeConfig?.path, shouldRoute, roles, userRoles);

    return shouldRoute;
  }
  
}
