import { ComponentType } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    public dialog: MatDialog
  ) { }

  openDialog(component: ComponentType<any>, data: any) {
    const dialog_ref = this.dialog.open(component, {
      autoFocus: true,
      // backdropClass: 'cdk-overlay-transparent-backdrop',
      closeOnNavigation: true,
      disableClose: false,
      hasBackdrop: true,
      // height: height,
      // width: width,
      data: data,

    });
    return dialog_ref;
  }
}
