import { Component, OnInit, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'milestone-academia-dynamic-dialog',
  templateUrl: './dynamic-dialog.component.html',
  styleUrls: ['./dynamic-dialog.component.scss'],
})
export class DynamicDialogComponent implements OnInit {
  constructor(
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit(): void {}
}
