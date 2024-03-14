import { Component, EventEmitter, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DialogCloseConfig, DynamicDialogComponent } from '../../../shared/modules/dialog/models/dynamicDialogComponent';
import { PresenceType } from '@milestone-academia/api-interfaces';

@Component({
  selector: 'milestone-academia-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnChanges, DynamicDialogComponent {

  @Output() close = new EventEmitter<DialogCloseConfig>();

  userDataForm = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    userName: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    userType: ['', [Validators.required]],
    presenceType: [PresenceType.InPerson, [Validators.required]],
  });

  personalDataForm = this.formBuilder.group({
    personalIdentification: ['', [Validators.required]],
    guardianName: ['', [Validators.required]],
    guardianEmail: ['', [Validators.email, Validators.required]],
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
  
  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  submitData() {
    this.close.next({
      data: {
        userData: this.userDataForm.value,
        personalData: this.personalDataForm.value,
        addressData: this.addressDataForm.value,
      },
      dialogResult: true
    })
  }
}
