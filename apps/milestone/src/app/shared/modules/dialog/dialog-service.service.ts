import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DynamicDialogComponent } from './dynamic-dialog/dynamic-dialog.component';
import { DynamicDialogInput } from './models/dynamicDialogInput.model';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    public dialog: MatDialog
  ) { }

  openDialog(data: DynamicDialogInput) {
    const dialog_ref = this.dialog.open(DynamicDialogComponent, {
      autoFocus: true,
      // backdropClass: 'cdk-overlay-transparent-backdrop',
      closeOnNavigation: true,
      disableClose: false,
      hasBackdrop: true,
      height: '90vh',
      // width: width,
      data: data,
    });
    return dialog_ref;
  }
}
