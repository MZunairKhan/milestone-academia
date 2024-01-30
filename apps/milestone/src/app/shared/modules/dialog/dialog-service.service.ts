import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DynamicDialogComponent } from './dynamic-dialog/dynamic-dialog.component';
import { DynamicDialogInput } from './models/dynamicDialogInput.model';
import { OpenDialogOptions } from './models/openDialogOptions';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    public dialog: MatDialog
  ) { }

  openDialog(data: DynamicDialogInput, options?: OpenDialogOptions) {
    const dialog_ref = this.dialog.open(DynamicDialogComponent, {
      autoFocus: true,
      // backdropClass: 'cdk-overlay-transparent-backdrop',
      closeOnNavigation: true,
      disableClose: false,
      hasBackdrop: options?.hasBackdrop ?? undefined,
      height: options?.height ?? undefined,
      width: options?.width ?? undefined,
      data: data,
    });
    return dialog_ref;
  }
}
