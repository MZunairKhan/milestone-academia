import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { SubjectService } from '../../services/subject.service';
import { CourseLevel, CourseType, CourseTypeDisplay, Days } from '@milestone-academia/api-interfaces';
import { CourseService } from '../../services/course.service';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: 'milestone-academia-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss'],
  host: {
    class:'milestone-router-component'
  }
})
export class CreateCourseComponent implements OnInit {

  subjectList:any[] = [];
  courseTypes: string[] = [];
  courseDays = [...Object.values(Days)];
  timeSlots = [
    "1:00 PM - 2:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM",
    "5:00 PM - 6:00 PM",
    "6:00 PM - 7:00 PM",
    "7:00 PM - 8:00 PM",
    "8:00 PM - 9:00 PM",
    "9:00 PM - 10:00 PM",
  ]
  
  createCourseForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    courseType: ['', [Validators.required]],
    subjectId: ['', [Validators.required]],
    description: ['', [Validators.required]],
    startDate: [new Date(year, month, 13), [Validators.required]],
    endDate: [new Date(year, month, 16), [Validators.required]],
    days: [[], [Validators.required]],
    timeSlots: [[], [Validators.required]],
  });

  get formValue() {
    return this.createCourseForm.value;
  }

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private courseService: CourseService,
    private subjectService: SubjectService,
  ) {
    Object.values(CourseType).forEach(v => this.courseTypes.push(CourseTypeDisplay[v]))
  }

  ngOnInit(): void {
    this.subjectService.getAllSubjects()
    .subscribe((v: any[]) => this.subjectList.push(...v))
    
    this.createCourseForm.valueChanges.subscribe(v => {
      console.log(this.createCourseForm.valid)
    })
  }

  goToRoute(route: string) {
    this.router.navigate([route]);
  }

  createCourse() {
    const selectedCourseType = (this.formValue.courseType as string).replaceAll(' ','');

    this.courseService.createCourse({
      name: this.formValue.name as string,
      subjectId: this.formValue.subjectId as string,
      courseDurationId: '',
      courseType: CourseType[selectedCourseType as keyof typeof CourseType],
      courseLevel: CourseLevel.Alevel,
      description: '',
      subText: '',
      details: '',
      price: 0,
      content: [],
      features: []
    }).subscribe(value => {
      this.goToRoute('course/my-courses');
    });
  }
}
