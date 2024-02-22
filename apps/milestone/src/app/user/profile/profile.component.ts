import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { StudentData, UserData } from '../models/user.model';

import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'milestone-academia-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  host: {
    class:'milestone-router-component'
  }
})
export class ProfileComponent implements OnInit, AfterViewInit {

  user$: Observable<UserData> = this.userService.userData$;
  student$: Observable<boolean> = this.userService.isStudent$;
  studentData$: Observable<StudentData> = this.userService.studentData$;

  userData: UserData = {
    userId: '',
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    userType: '',
    presenceType: ''
  };

  userDataForm = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    userName: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    userType: [{value: '', disabled: true}, [Validators.required]],
    presenceType: [{value: '', disabled: false}, [Validators.required]],
  });

  studentDataForm = this.formBuilder.group({
    personalIdentification: [''],
    addressLine1: [''],
    addressLine2: [''],
    postalCode: [''],
    city: [''],
    country: [''],
    guardianName: [''],
    guardianIdentification: [''],
    phoneNumber: [''],
  });
  
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    if (!this.userService.userSource$.value.email) {
      this.userService.getUserData()
      .subscribe((userData: UserData) => {
        // console.log("requested userData", userData)
      });
    }
  }

  ngAfterViewInit(): void {
    console.log("profile data", this.userData);
  }
  
}
