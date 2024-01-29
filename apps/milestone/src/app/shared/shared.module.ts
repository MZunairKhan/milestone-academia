import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { PersonalDetailsComponent } from './components/personal-details/personal-details.component';
import { AddressDetailsComponent } from './components/address-details/address-details.component';



@NgModule({
  declarations: [
    NotFoundComponent,
    UserDetailsComponent,
    AddressDetailsComponent,
    PersonalDetailsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    NotFoundComponent,
    UserDetailsComponent,
    AddressDetailsComponent,
    PersonalDetailsComponent
  ]
})
export class SharedModule { }
