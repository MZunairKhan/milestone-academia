import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { StudentData } from '../../../user/models/user.model';

@Component({
  selector: 'milestone-academia-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.scss'],
})
export class AddressDetailsComponent implements OnInit, OnChanges {

  @Input() personalData: StudentData | null = null;
  @Input() parentForm: FormGroup;

  constructor() {}

  ngOnInit(): void {}
  
  ngOnChanges(changes: SimpleChanges): void {
    const personalData = changes['personalData'];
    
    if (personalData) {
      if (JSON.stringify(personalData.currentValue) !== JSON.stringify(personalData.previousValue)) {
        this.initForm();
      }
    }
  }

  updateValue = (controlName: string, value: string) => this.parentForm?.controls[controlName].patchValue(value)

  initForm() {
    this.updateValue('addressLine1', this.personalData?.addressLine1 ?? '');
    this.updateValue('addressLine2', this.personalData?.addressLine2 ?? '');
    this.updateValue('postalCode', this.personalData?.postalCode ?? '');
    this.updateValue('city', this.personalData?.city ?? '');
    this.updateValue('country', this.personalData?.country ?? '');
  }
}
