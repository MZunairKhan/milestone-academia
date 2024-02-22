import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'milestone-academia-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();

  loginForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  
  constructor(
    private readonly authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.authService.loggedIn$
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(v => this.moveToDashboard(v))
  }
  
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onSubmit(data: any) {
    const {userName, password} = this.loginForm.value;
    this.authService
    .login(userName as string, password as string);
  }

  moveToDashboard(isLoggedIn: boolean) {
    if (isLoggedIn) {
      this.authService.routeTo('user/dashboard');
    }
  }
}
