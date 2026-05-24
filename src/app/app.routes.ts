import { Routes } from '@angular/router';

import { LoginComponent } from './modules/auth/login/login';

import { Home } from './modules/dashboard/home/home';

import { UserManagementComponent } from './modules/admin/user-management/user-management';

import { authGuard } from './core/guards/auth.guard';

import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [

  {
    path: '',
    component: LoginComponent
  },

  {
    path: 'dashboard',
    component: Home,
    canActivate: [authGuard]
  },

  {
    path: 'admin',
    component: UserManagementComponent,
    canActivate: [adminGuard]
  }

];