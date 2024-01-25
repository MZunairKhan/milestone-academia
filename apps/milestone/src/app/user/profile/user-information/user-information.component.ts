import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserData } from '../../models/user.model';

@Component({
  selector: 'milestone-academia-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.scss'],
})
export class UserInformationComponent implements OnInit, AfterViewInit {

  @Input() userData: UserData | null = null;

  userDataForm = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    userName: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    userType: [{value: '', disabled: true}, [Validators.required]],
    presenceType: [{value: '', disabled: true}, [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    console.log("userData", this.userData);
    this.initForm();
  }

  initForm() {
    this.userDataForm = this.formBuilder.group({
      firstName: [this.userData?.firstName ?? '', [Validators.required]],
      lastName: [this.userData?.lastName ?? '', [Validators.required]],
      userName: [this.userData?.userName ?? '', [Validators.required]],
      userType: [{value: this.userData?.userType ?? '', disabled: true}, [Validators.required]],
      presenceType: [{value: this.userData?.presenceType ?? '', disabled: true}, [Validators.required]],
      email: [this.userData?.email ?? '', [Validators.email, Validators.required]],
    });
  }
}
