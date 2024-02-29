import { Injectable } from '@angular/core';
import { UserRoles, UserType } from '@milestone-academia/api-interfaces';
import { AuthService } from './auth.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(
    private authService: AuthService
  ) {
  }

  private get authData() {
    return this.authService.authData$
  }

  checkRoles(roles: string[]): boolean {
    const providedRoles = this.authService.currentUserRoles() ?? [];
    return roles.every(role => providedRoles.includes(role));
  }

  isStaff$ = this.authData.pipe(map(v => v.userType === UserType.Staff));
  isMaster$ = this.authData.pipe(map(v => v.userType === UserType.Master));
  isStudent$ = this.authData.pipe(map(v => v.userType === UserType.Student));
  isInstructor$ = this.authData.pipe(map(v => v.userType === UserType.Instructor));
}
