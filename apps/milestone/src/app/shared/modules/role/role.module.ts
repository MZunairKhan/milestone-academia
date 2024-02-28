import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MSAllowRoleDirective } from './allow-role.directive';



@NgModule({
  declarations: [
    MSAllowRoleDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MSAllowRoleDirective
  ]
})
export class RoleModule { }
