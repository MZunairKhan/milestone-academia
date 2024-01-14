import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'milestone-academia-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  
  constructor(
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {}

  onSubmit(data: any) {
    const {userName, password} = this.loginForm.value;
    this.authService
    .login(userName as string, password as string);
  }
}
