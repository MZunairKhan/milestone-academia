import { Observable } from 'rxjs';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
import { AuthData } from '../../auth/models/auth.model';
import { UserRoles } from '@milestone-academia/api-interfaces';
import { RoleService } from '../../shared/modules/role/role.service';

@Component({
  selector: 'milestone-academia-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  
  manageUserRoleList = [UserRoles.CreateUser, UserRoles.RetrieveUser, UserRoles.UpdateUser, UserRoles.DeleteUser]
  
  auth$: Observable<AuthData> = this.authService.authData$;

  loggedIn$: Observable<boolean> = this.authService.loggedIn$;

  @Output() sideButtonClick = new EventEmitter<boolean>();

  constructor(
    private authService: AuthService,
    private router: Router,
    private roleService: RoleService
  ) {
  }

  ngOnInit(): void {}

  get displayManageUsers() {
    return this.roleService.checkRoles(this.manageUserRoleList);
  }

  sideButtonClicked() {
    this.sideButtonClick.emit(true);
  }

  logout() {
    this.authService.logout();
  }

  goToRoute(route: string) {
    this.router.navigate([route]);
  }
}
