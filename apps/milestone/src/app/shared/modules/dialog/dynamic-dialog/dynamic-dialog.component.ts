import { AfterViewInit, Component, Inject, OnChanges,
  OnDestroy,
  SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { DynamicDialogInput } from '../models/dynamicDialogInput.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { DialogService } from '../dialog-service.service';

@Component({
  selector: 'milestone-academia-dynamic-dialog',
  templateUrl: './dynamic-dialog.component.html',
  styleUrls: ['./dynamic-dialog.component.scss'],
})
export class DynamicDialogComponent implements OnChanges, OnDestroy, AfterViewInit {
  private ngUnsubscribe = new Subject<void>();
  
  @ViewChild("container", { read: ViewContainerRef }) divContainer: ViewContainerRef;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DynamicDialogInput,
    private dialogService: DialogService
  ) {}

  ngAfterViewInit(): void {
    this.createChild(this.data);
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    const data = changes['data'];

    if (data) {
      if (JSON.stringify(data.currentValue) === JSON.stringify(data.previousValue)) {
        this.createChild(data.currentValue);
      }
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  createChild(data: DynamicDialogInput) {
    const compRef = this.divContainer.createComponent(data.component);
    compRef.instance.data = data.componentData;

    compRef.instance.close
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((v: any) => this.dialogService.dialog_ref.close(v));
  }
}
