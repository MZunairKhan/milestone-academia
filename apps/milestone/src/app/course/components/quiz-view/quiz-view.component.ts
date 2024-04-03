import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'milestone-academia-my-courses-quizview',
  templateUrl: './quiz-view.component.html',
  styleUrls: ['./quiz-view.component.scss'],
  host: {
    class: 'milestone-router-component',
  },
})
export class QuizViewComponent implements OnInit {
  selectedQuestion: any;
  questionNumber = 0;
  options: string[] = [];
  selectedOptionIndex: number;
  isLastQuestion = false;
  answers: any = [];
  isSubmitted: boolean = false

  constructor(private router: Router, private courseService: CourseService) {}

  ngOnInit(): void {
    this.fetchQuestion();
  }

  fetchQuestion(): void {
    this.courseService.getAllMcqs().subscribe((value) => {
      this.selectedQuestion = value[this.questionNumber];
      this.options = this.selectedQuestion.choices;
      this.isLastQuestion = this.questionNumber === value.length - 1;
    });
  }

  handleNext(questionId: string): void {
    const arr = {
      questionId: questionId,
      answerIndex: this.selectedOptionIndex,
    };
    this.answers.push(arr);
    console.log(this.answers);
    this.selectedOptionIndex = -1;
    if (this.isLastQuestion) {
      console.log('Submitting answers...');
      this.isSubmitted =true
    } else {
      this.questionNumber += 1;
      this.fetchQuestion();
    }
  }

  handleRoute(){
    this.router.navigate([`course/my-courses`]);
  }
}
