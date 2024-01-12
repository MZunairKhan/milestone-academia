import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { APIS } from '../../environments/api-routes';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

  login(userName: string, password: string) {  
    this.http.post<any>(APIS.auth.login, {userName, password})
    .subscribe(value => {
      this.goToDashboard();
      console.log(value)
      this.http.get<any>(APIS.auth.test).subscribe(value => console.log(value));
    })
  }
  
  private goToDashboard() {
    this.router.navigate(['user/dashboard']);
  }
}
