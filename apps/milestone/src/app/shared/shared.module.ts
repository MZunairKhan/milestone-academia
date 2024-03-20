import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { PersonalDetailsComponent } from './components/personal-details/personal-details.component';
import { AddressDetailsComponent } from './components/address-details/address-details.component';
import { DynamicDialogModule } from './modules/dialog/dialog.module';
import { RoleModule } from './modules/role/role.module';
import { MetadataComponent } from './components/metadata/metadata.component';


@NgModule({
  declarations: [
    NotFoundComponent,
    MetadataComponent,
    UserDetailsComponent,
    AddressDetailsComponent,
    PersonalDetailsComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DynamicDialogModule,
    RoleModule
  ],
  exports: [
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    DynamicDialogModule,
    RoleModule,
    NotFoundComponent,
    MetadataComponent,
    UserDetailsComponent,
    AddressDetailsComponent,
    PersonalDetailsComponent
  ]
})
export class SharedModule { }
