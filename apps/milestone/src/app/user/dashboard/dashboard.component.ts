import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserData } from '../models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'milestone-academia-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  host: {
    class:'milestone-router-component'
  }
})
export class DashboardComponent implements OnInit {

  user$: Observable<UserData> = this.userService.userData$;

  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getUserData()
    .subscribe((userData: UserData) => {
      console.log("userData", userData)
    });
  }
}
