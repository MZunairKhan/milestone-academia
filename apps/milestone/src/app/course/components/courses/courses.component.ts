import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '../../models/course.model';
import { sampleCourses } from '../../models/courses.sample';

interface SubjectFilters {
  title: string;
  value: boolean;
}

@Component({
  selector: 'milestone-academia-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  host: {
    class:'milestone-router-component'
  }
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  displayedCourses: Course[] = [];
  subjectFilters: string[] = [];

  selectedFilters: string[] = [];
  unselectedFilters: string[] = [];

  columns: 1 | 2 = 1;

  constructor(
    private router: Router,
  ) {
    this.courses = sampleCourses;
    this.displayedCourses = sampleCourses;
    this.subjectFilters = sampleCourses.map(s => s.subject).filter((v, i, a) => a.indexOf(v) === i);
    this.unselectedFilters = this.subjectFilters;
    console.log(this.subjectFilters)
  }

  ngOnInit(): void {}

  buttonToggled = (value: any) => this.columns = value

  openDetails = (data: Course) => this.router.navigate([`course/details/${data.id}`])

  activateFilter = (filter: string) => {
    const filterIndex = this.subjectFilters.findIndex(f => f === filter);
    this.selectedFilters.push(this.subjectFilters[filterIndex]);
    this.unselectedFilters.splice(filterIndex,1);
  }

  deactivateFilter = (filter: string) => {
    const filterIndex = this.selectedFilters.findIndex(f => f === filter);
    if (filterIndex > -1) {
      this.selectedFilters.splice(filterIndex,1);
    }
    
    this.unselectedFilters = this.subjectFilters.filter(f => f !== filter);
  }
}
