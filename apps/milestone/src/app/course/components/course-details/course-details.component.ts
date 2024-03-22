import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';


@Component({
  selector: 'milestone-academia-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
  host: {
    class:'milestone-router-component'
  }
})
export class CourseDetailsComponent implements OnInit {

  courseData?: any;
  courseId: string;
  dataLoaded = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {
    this.courseId = route.snapshot.paramMap.get('id') as string;
    // this.courseData = sampleCourses.find(c => c.id === this.courseId);
    this.courseService.getCourseById(this.courseId).subscribe(data => {
      data.rows = 1;
      data.cols = 1;
      data.color = 'lightblue';
      this.courseData = data;
      this.dataLoaded = true;
    })
  }

  get courseDays() {
    return this.courseData?.courseDuration?.days.join(", ")
  }

  ngOnInit(): void {
  }

  goToCourses = () => this.router.navigate([`course/list`])
  
}
