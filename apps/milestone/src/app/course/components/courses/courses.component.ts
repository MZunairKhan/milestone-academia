import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '../../models/course.model';
import { sampleCourses } from '../../models/courses.sample';
import { CourseService } from '../../services/course.service';

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
    private courseService: CourseService
  ) {
    this.setCourses(sampleCourses);
  }

  ngOnInit(): void {
    this.courseService.getAllCourse().subscribe(value => {
      console.log(value[0], sampleCourses[0]);
      this.setCourses(value.map((v: any) => ({...v, cols: 1, rows: 1, color: "lightblue"})));
    })
  }

  setCourses(data: Course[]) {
    this.courses = data;
    this.displayedCourses = data;
    this.subjectFilters = data.map(s => s.subject).filter((v, i, a) => a.indexOf(v) === i);
    this.unselectedFilters = this.subjectFilters;
    console.log(this.subjectFilters)
  }

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
