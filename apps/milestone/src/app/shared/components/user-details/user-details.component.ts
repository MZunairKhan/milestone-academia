import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserData } from '../../../user/models/user.model';

@Component({
  selector: 'milestone-academia-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit, OnChanges {

  @Input() parentForm: FormGroup;
  @Input() userData: UserData | null = null;

  constructor() {}

  ngOnInit(): void {
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    const userData = changes['userData'];
    
    if (JSON.stringify(userData.currentValue) !== JSON.stringify(userData.previousValue)) {
      this.initForm();
    }
  }

  updateValue = (controlName: string, value: string) => this.parentForm?.controls[controlName].patchValue(value)

  initForm() {
    this.updateValue('firstName', this.userData?.firstName ?? '');
    this.updateValue('lastName', this.userData?.lastName ?? '');
    this.updateValue('userName', this.userData?.userName ?? '');
    this.updateValue('userType', this.userData?.userType ?? '');
    this.updateValue('presenceType', this.userData?.presenceType ?? '');
    this.updateValue('email', this.userData?.email ?? '');
  }
}
