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
  tokenRefreshInterval :any


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

  // onSubmit(data: any) {
  //   const {userName, password} = this.loginForm.value;
  //   this.authService
  //   .login(userName as string, password as string).subscribe((value: any)=>{
  //     console.log(value);
  //    this.authService.onSuccessFullLogin(value.userData)
  //    setInterval(()=>{
  //     this.authService.refreshToken(value.refresh_token).subscribe((value: any)=>{
  //       this.authService.onSuccessFullLogin(value.userData)
  //       console.log('refreshed');
  //     })
  //    },10000)
     
  //     ;},
  //     error=>{
  //       this.toastService.openSnackBar(error.error.message)
  //       this.loginForm.controls['password'].setErrors({ 'incorrect': true });
  //       this.loginForm.controls['userName'].setErrors({ 'incorrect': true });
  //     });
     

  // }

  onSubmit(data: any) {
    const { userName, password } = this.loginForm.value;
    this.authService.login(userName as string, password as string).subscribe((value: any) => {
        console.log('value is',value);
        this.authService.onSuccessFullLogin(value.userData);
        localStorage.setItem('exp', value.userData.exp)
        localStorage.setItem('refresh_token', value.refresh_token)
        localStorage.setItem('isLoggedIn', 'true');
        // this.startTokenRefreshInterval();
    }, error => {
      this.toastService.openSnackBar(error.error.message);
      this.loginForm.controls['password'].setErrors({ 'incorrect': true });
      this.loginForm.controls['userName'].setErrors({ 'incorrect': true });
    });
}

private startTokenRefreshInterval() {
  this.stopTokenRefreshInterval();
  const token = localStorage.getItem('refresh_token');
  if (token) {
      const expiryTime = parseInt(localStorage.getItem('exp') || '0', 10) * 1000; 
      const expiryDate = new Date(1712224625 * 1000); 
      console.log('Expiry time',expiryDate);
      const currentTime = new Date().getTime();
      const timeDifference = (expiryTime - currentTime) - 60000;
      console.log('current time', currentTime);
      console.log('time difference',timeDifference);
      
        if(timeDifference > 0){
          this.tokenRefreshInterval = setInterval(() => {
            this.authService.refreshToken(token).subscribe((value: any) => {
              localStorage.setItem('exp', value.userData.exp)
              this.authService.handleSuccessfullLogin(value.userData);
              console.log('Token refreshed');
              this.startTokenRefreshInterval();
            });
        }, timeDifference);
        }else{
          console.log('Token Expired');
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
