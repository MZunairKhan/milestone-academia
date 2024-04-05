import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { RoleService } from './auth/services/role.service';
import { CourseRoles } from '@milestone-academia/api-interfaces';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'milestone-academia-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent  implements OnInit{
  @ViewChild('drawer')
  public sidenav!: MatSidenav;
  private tokenRefreshInterval: any;

  createCourseRoleList = [CourseRoles.CreateCourse];

  constructor(
    private router: Router,
    private roleService: RoleService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    const isUserLoggedIn = localStorage.getItem('isLoggedIn');
    const token = localStorage.getItem('refresh_token');
    if(isUserLoggedIn && token){
      this.startTokenRefreshInterval();
    }
  }

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


  //token refresh

  private startTokenRefreshInterval() {
    this.stopTokenRefreshInterval();
    const token = localStorage.getItem('refresh_token');
    if (token) {
        const expiryTime = parseInt(localStorage.getItem('exp') || '0', 10) * 1000; 
        const currentTime = new Date().getTime();
        const timeDifference = (expiryTime - currentTime) - 60000;
        
          if(timeDifference > 0){
            this.tokenRefreshInterval = setInterval(() => {
              this.authService.refreshToken(token).subscribe((value: any) => {
                localStorage.setItem('exp', value.userData.exp)
                this.authService.handleSuccessfullLogin(value.userData);
                this.startTokenRefreshInterval();
              });
          }, timeDifference);
          }else{
            localStorage.clear();
          }
            
        
    }else{
      localStorage.clear()
    }
}

private stopTokenRefreshInterval() {
    if (this.tokenRefreshInterval) {
        clearInterval(this.tokenRefreshInterval);
        this.tokenRefreshInterval = null;
    }
}


}
