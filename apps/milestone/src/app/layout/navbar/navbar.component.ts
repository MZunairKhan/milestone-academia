import { Observable } from 'rxjs';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'milestone-academia-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user$ = {};
  loggedIn$: Observable<boolean> = this.authService.loggedIn$;

  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.authService.userSource$.asObservable().subscribe(value => {
      this.user$ = value;
    })
  }

  @Output() sideButtonClick = new EventEmitter<boolean>();

  sideButtonClicked() {
    this.sideButtonClick.emit(true);
  }

  logout() {
    this.authService.logout();
  }
}
