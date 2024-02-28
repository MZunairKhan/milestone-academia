import { Injectable } from '@angular/core';
import { UserRoles } from '@milestone-academia/api-interfaces';
import { AuthService } from '../../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(
    private authService: AuthService
  ) {
  }

  checkRoles(roles: string[]): boolean {
    const providedRoles = this.authService.currentUserRoles() ?? [];
    return roles.every(role => providedRoles.includes(role));
  }
}
