import { AfterViewInit, Component, Inject, OnChanges,
  SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { DynamicDialogInput } from '../models/dynamicDialogInput.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'milestone-academia-dynamic-dialog',
  templateUrl: './dynamic-dialog.component.html',
  styleUrls: ['./dynamic-dialog.component.scss'],
})
export class DynamicDialogComponent implements OnChanges, AfterViewInit {
  
  @ViewChild("container", { read: ViewContainerRef }) divContainer: ViewContainerRef;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DynamicDialogInput
  ) {}

  ngAfterViewInit(): void {
    this.createChild(this.data);
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    const data = changes['data'];

    if (data) {
      if (JSON.stringify(data.currentValue) === JSON.stringify(data.previousValue)) {
        this.divContainer.createComponent(data.currentValue);
      }
    }
  }

  createChild(data: DynamicDialogInput) {
    this.divContainer.createComponent(data.component);
  }
}
