import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'milestone-academia-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  host: {
    class:'milestone-router-component'
  }
})
export class DashboardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
