import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { APIS } from '../../environments/api-routes';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) {
  }

  login(userName: string, password: string) {  
    this.http.post<any>(APIS.auth.login, {userName, password})
    .subscribe(value => {
      console.log(value)
      this.http.get<any>(APIS.auth.test).subscribe(value => console.log(value));
    })
  }
}
