import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { UserData } from '../../models/user.model';

import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'milestone-academia-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  host: {
    class:'milestone-router-component'
  }
})
export class ProfileComponent implements OnInit {

  user$: Observable<UserData> = this.userService.userData$;
  student$: Observable<boolean> = this.userService.isStudent$;

  userData: UserData = {
    userId: '',
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    userType: '',
    presenceType: ''
  };

  constructor(
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    if (!this.userService.userSource$.value.email) {
      this.userService.getUserData()
      .subscribe((userData: UserData) => {
        // console.log("requested userData", userData)
      });
    }
  }
}
