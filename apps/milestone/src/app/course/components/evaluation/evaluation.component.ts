import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'milestone-academia-my-courses-evaluations',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss'],
  host: {
    class: 'milestone-router-component',
  },
})
export class EvaluationComponent implements OnInit {
  columns: 1 | 2 = 1;
  constructor(private router: Router, private courseService: CourseService) {}
  ngOnInit(): void {}

  handleRoute() {
    this.router.navigate([`course/my-courses/evaluation/new/assestment`]);
  }
}
