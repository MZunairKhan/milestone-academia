import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'milestone-academia-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  
  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}

  userDataForm = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    userName: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    userType: ['', [Validators.required]],
    presenceType: ['', [Validators.required]],
  });

  personalDataForm = this.formBuilder.group({
    personalIdentification: ['', [Validators.required]],
    guardianName: ['', [Validators.required]],
    guardianIdentification: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required]],
  });

  addressDataForm = this.formBuilder.group({
    addressLine1: ['', [Validators.required]],
    addressLine2: ['', [Validators.required]],
    postalCode: ['', [Validators.required]],
    city: ['', [Validators.required]],
    country: ['', [Validators.required]],
  });
}
