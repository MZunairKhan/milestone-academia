import { AfterViewInit, Component, OnChanges, SimpleChanges } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { DynamicDialogComponent } from '../../../shared/modules/dialog/models/dynamicDialogComponent';

@Component({
  selector: 'milestone-academia-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnChanges, AfterViewInit, DynamicDialogComponent {

  data: any;
  
  userDataForm = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    userName: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    userType: ['', [Validators.required]],
    presenceType: ['', [Validators.required]],
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
    private formBuilder: FormBuilder
  ) {}
  
  ngAfterViewInit(): void {
    console.log('UserInfoComponent', this);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('UserInfoComponent', changes);
  }
}
