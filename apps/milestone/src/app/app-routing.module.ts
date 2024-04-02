import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { MetadataComponent } from './shared/components/metadata/metadata.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'welcome', component: NxWelcomeComponent },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'course',
    loadChildren: () => import('./course/course.module').then(m => m.CourseModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'attendance',
    loadChildren: () => import('./attendance/attendance.module').then(m => m.AttendanceModule)
  },
  {
    path: 'metadata',
    component: MetadataComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }