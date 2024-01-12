import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent } from './login/login.component';
import { CreateUserComponent } from './create-user/create-user.component';

@NgModule({
  declarations: [LoginComponent, CreateUserComponent],
  imports: [CommonModule, SharedModule, AuthRoutingModule]
})
export class AuthModule {}
