import {
  Component,
  EventEmitter,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  DialogCloseConfig,
  DynamicDialogComponent,
} from '../../../shared/modules/dialog/models/dynamicDialogComponent';
import { CourseLevel, Levels } from '@milestone-academia/api-interfaces';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'milestone-academia-add-mcqs',
  templateUrl: './add-mcqs.component.html',
  styleUrls: ['./add-mcqs.component.scss'],
})
export class AddMcqsComponent
  implements OnChanges, OnInit, DynamicDialogComponent
{
  correctOption = 0;
  id: string;
  data: any;
  grades = [
    CourseLevel.Alevel,
    CourseLevel.Edexcel,
    CourseLevel.IGCSE,
    CourseLevel.Olevel,
  ];
  levels = [Levels.One, Levels.Two, Levels.Three, Levels.Four, Levels.Five];

  @Output() close = new EventEmitter<DialogCloseConfig>();

  mcqsDataForm = new FormGroup({
    question: new FormControl('', [Validators.required]),
    grade: new FormControl('', [Validators.required]),
    level: new FormControl('', [Validators.required]),
    optionOne: new FormControl('', [Validators.required]),
    optionTwo: new FormControl('', [Validators.required]),
    optionThree: new FormControl('', [Validators.required]),
    optionFour: new FormControl('', [Validators.required]),
  });

  constructor() { }

  ngOnInit(): void {
    this.correctOption = this.data.mcqsData.correctOption;
    this.id = this.data.mcqsData.id;
    if (this.data && this.data.mcqsData) {
      this.mcqsDataForm.patchValue({
        question: this.data.mcqsData.question || '',
        grade: this.data.mcqsData.grade || '',
        level: this.data.mcqsData.level,
        optionOne: this.data.mcqsData.choices[0] || '',
        optionTwo: this.data.mcqsData.choices[1] || '',
        optionThree: this.data.mcqsData.choices[2] || '',
        optionFour: this.data.mcqsData.choices[3] || '',
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  handleRadioClick(event: MatRadioChange): void {
    const selectedValue = event.value;
    this.correctOption = selectedValue;
  }

  async onSubmit(data: any) {
    const {
      question,
      grade,
      level,
      optionOne,
      optionTwo,
      optionThree,
      optionFour,
    } = this.mcqsDataForm.value;
    const mcqData = {
      question: question,
      grade: grade,
      level: level,
      correctOption: this.correctOption,
      choices: [optionOne, optionTwo, optionThree, optionFour],
      subjectId: '461a21fc-7484-44dd-80a0-1b4efe011baa',
      id: this.id,
    };

    this.close.next({
      data: {
        mcqData: mcqData,
      },
      dialogResult: true,
    });
  }

  submitData() {
    this.close.next({
      data: {
        mcqsData: this.mcqsDataForm.value,
      },
      dialogResult: true,
    });
  }
}
