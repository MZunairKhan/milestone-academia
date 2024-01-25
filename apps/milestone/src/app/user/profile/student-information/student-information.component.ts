import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'milestone-academia-student-information',
  templateUrl: './student-information.component.html',
  styleUrls: ['./student-information.component.scss'],
})
export class StudentInformationComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}
}
