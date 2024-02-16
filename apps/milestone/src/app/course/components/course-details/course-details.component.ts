import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course, CourseFeatures } from '../../models/course.model';
import { sampleCourses } from '../../models/courses.sample';


@Component({
  selector: 'milestone-academia-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
  host: {
    class:'milestone-router-component'
  }
})
export class CourseDetailsComponent implements OnInit {

  courseData?: Course;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    const id = route.snapshot.paramMap.get('id');
    this.courseData = sampleCourses.find(c => c.id === id);
  }

  ngOnInit(): void {}

  goToCourses = () => this.router.navigate([`course/list`])
  
}
