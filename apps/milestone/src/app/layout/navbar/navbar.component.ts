import { Observable } from 'rxjs';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
import { AuthData } from '../../auth/models/auth.model';

@Component({
  selector: 'milestone-academia-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  auth$: Observable<AuthData> = this.authService.authSource$.asObservable();

  loggedIn$: Observable<boolean> = this.authService.loggedIn$;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {}

  @Output() sideButtonClick = new EventEmitter<boolean>();

  sideButtonClicked() {
    this.sideButtonClick.emit(true);
  }

  logout() {
    this.authService.logout();
  }

  goToProfile() {
    this.router.navigate(['user/profile']);
  }
}
