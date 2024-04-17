import { Injectable } from '@angular/core';
import { PresenceType, UserRoles, UserType } from '@milestone-academia/api-interfaces';
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

  userType$ = this.authData.pipe(map(v => v.userType));
  presenceType$ = this.authData.pipe(map(v => v.presenceType));

  isStaff$ = this.authData.pipe(map(v => v.userType === UserType.Staff));
  isMaster$ = this.authData.pipe(map(v => v.userType === UserType.Master));
  isStudent$ = this.authData.pipe(map(v => v.userType === UserType.Student));
  isInstructor$ = this.authData.pipe(map(v => v.userType === UserType.Instructor));

  isOnline$ = this.authData.pipe(map(v => v.presenceType === PresenceType.Online));
  isInPerson$ = this.authData.pipe(map(v => v.presenceType === PresenceType.InPerson));
}
