import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ManageUsersComponent } from './manage/manage-users/manage-users.component';
import { AuthGuard } from '../auth/services/auth.guard';
import { UserRoles } from '@milestone-academia/api-interfaces';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], data: {roles: [UserRoles.RetrieveUser]} },
  { path: 'manage', component: ManageUsersComponent, canActivate: [AuthGuard], data: {roles: [...Object.values(UserRoles)]} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }