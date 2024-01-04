import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'milestone-academia-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Output() sideButtonClick = new EventEmitter<boolean>();

  sideButtonClicked() {
    this.sideButtonClick.emit(true);
  }
}
