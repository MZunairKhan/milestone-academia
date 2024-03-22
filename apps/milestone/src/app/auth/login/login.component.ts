import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { ToastService } from '../../shared/services/toast.service';

@Component({
  selector: 'milestone-academia-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  showForgotPasswordForm = false;
  showEmailSuccess = false;
  hide = true;


  loginForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
  });
  
  constructor(
    private readonly authService: AuthService,
    private readonly toastService: ToastService

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
    .login(userName as string, password as string).subscribe((value: any)=>{
     this.authService.onSuccessFullLogin(value.userData)
     setInterval(()=>{
      this.authService.refreshToken(value.refresh_token).subscribe((value: any)=>{
        this.authService.onSuccessFullLogin(value.userData)
      })
     },1740000)
     
      ;},
      error=>{
        this.toastService.openSnackBar(error.error.message)
        this.loginForm.controls['password'].setErrors({ 'incorrect': true });
        this.loginForm.controls['userName'].setErrors({ 'incorrect': true });
      });
     

  }
  onForgotPassword() {
    const {email} = this.forgotPasswordForm.value;
    this.authService.forgotPassword(email as string).subscribe(value=>{
  if(value.status === 200){
    this.showEmailSuccess = true
  }else{
    this.showEmailSuccess = false

  }
  ;})
  

  }
  
  

  moveToDashboard(isLoggedIn: boolean) {
    if (isLoggedIn) {
      // this.authService.routeTo('user/dashboard');
    }
  }
}
