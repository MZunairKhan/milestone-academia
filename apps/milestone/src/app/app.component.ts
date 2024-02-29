import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { RoleService } from './auth/services/role.service';
import { CourseRoles } from '@milestone-academia/api-interfaces';

@Component({
  selector: 'milestone-academia-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('drawer')
  public sidenav!: MatSidenav;
  
  createCourseRoleList = [CourseRoles.CreateCourse];

  constructor(
    private router: Router,
    private roleService: RoleService
  ) {}

  get displayCreateCourse() {
    return this.roleService.checkRoles(this.createCourseRoleList);
  }

  toggleDrawer(value: boolean) {
    this.sidenav.toggle();
  }

  routeTo(route: string) {
    this.router.navigate([route]);
    this.toggleDrawer(true);
  }
}
