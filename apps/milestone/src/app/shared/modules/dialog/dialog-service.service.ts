import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DynamicDialogComponent } from './dynamic-dialog/dynamic-dialog.component';
import { DynamicDialogInput } from './models/dynamicDialogInput.model';
import { OpenDialogOptions, CreateDialogData } from './models/openDialogOptions';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  
  dialog_ref: MatDialogRef<DynamicDialogComponent, any>

  constructor(
    public dialog: MatDialog
  ) { }

  createComponentDialog(data: CreateDialogData) {
    this.openComponentDialog(data.componentData, data.dialogOptions)
        .afterClosed()
        .subscribe(data.dialogCloseHandler);
  }

  openTemplateDialog(template: TemplateRef<any>, options?: OpenDialogOptions) {
    this.dialog_ref = this.dialog.open(template, {
      autoFocus: true,
      closeOnNavigation: true,
      disableClose: false,
      hasBackdrop: options?.hasBackdrop ?? undefined,
      height: options?.height ?? undefined,
      width: options?.width ?? undefined,
      // data: data,
    });
    return this.dialog_ref;
  }

  private openComponentDialog(data: DynamicDialogInput, options?: OpenDialogOptions) {
    this.dialog_ref = this.dialog.open(DynamicDialogComponent, {
      autoFocus: true,
      closeOnNavigation: true,
      disableClose: false,
      hasBackdrop: options?.hasBackdrop ?? undefined,
      height: options?.height ?? undefined,
      width: options?.width ?? undefined,
      data: data,
    });
    return this.dialog_ref;
  }
}
