import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { StudentData } from '../../models/user.model';

@Component({
  selector: 'milestone-academia-student-information',
  templateUrl: './student-information.component.html',
  styleUrls: ['./student-information.component.scss'],
})
export class StudentInformationComponent implements OnInit, AfterViewInit {

  @Input() studentData: StudentData | null = null;

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

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    console.log("userData", this.studentData);
    this.initForm();
  }

  initForm() {
    this.studentDataForm = this.formBuilder.group({
      personalIdentification: [this.studentData?.personalIdentification ?? ''],
      addressLine1: [this.studentData?.addressLine1 ?? ''],
      addressLine2: [this.studentData?.addressLine2 ?? ''],
      postalCode: [this.studentData?.postalCode ?? ''],
      city: [this.studentData?.city ?? ''],
      country: [this.studentData?.country ?? ''],
      guardianName: [this.studentData?.guardianName ?? ''],
      guardianIdentification: [this.studentData?.guardianIdentification ?? ''],
      phoneNumber: [this.studentData?.phoneNumber ?? ''],
    });
  }
}
