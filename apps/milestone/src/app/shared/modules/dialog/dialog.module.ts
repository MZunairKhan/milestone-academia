import { NgModule } from '@angular/core';

import { MaterialModule } from '../../material.module';
import { DynamicDialogComponent } from './dynamic-dialog/dynamic-dialog.component';

@NgModule({
  declarations: [
    DynamicDialogComponent
  ],
  imports: [
    MaterialModule
  ],
  exports: [
    DynamicDialogComponent
  ]
})
export class DynamicDialogModule { }
