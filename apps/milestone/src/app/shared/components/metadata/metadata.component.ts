import { Component, OnInit } from '@angular/core';
import { DurationService } from '../../services/duration.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Days } from '@milestone-academia/api-interfaces';

@Component({
  selector: 'milestone-academia-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.scss'],
  host: {
    class:'milestone-router-component'
  }
})
export class MetadataComponent implements OnInit {
  
  courseDurations: any[];
  courseDays = [...Object.values(Days)];
  
  createCourseDurationForm = this.formBuilder.group({
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    days: [[], [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private readonly durationService: DurationService,
  ) {}

  ngOnInit(): void {
    this.getCourseDuration();
  }

  getCourseDuration() {
    this.durationService.getAllCourseDuration().subscribe(v => this.courseDurations = v);
  }

  createCourseDuration() {
    this.durationService.createCourseDuration({
      startDate: this.createCourseDurationForm.value.startDate,
      endDate: this.createCourseDurationForm.value.endDate,
      days: this.createCourseDurationForm.value.days,
    }).subscribe(v => {
      this.getCourseDuration();
      this.createCourseDurationForm = this.formBuilder.group({
        startDate: ['', [Validators.required]],
        endDate: ['', [Validators.required]],
        days: [[], [Validators.required]],
      });
    })
  }
}
