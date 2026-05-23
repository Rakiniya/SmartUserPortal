import { Routes } from '@angular/router';

import { Login } from './modules/auth/login/login';
import { Home } from './modules/dashboard/home/home';
import { UserManagement } from './modules/admin/user-management/user-management';

export const routes: Routes = [
  {
    path: '',
    component: Login
  },
  {
    path: 'dashboard',
    component: Home
  },
  {
    path: 'admin',
    component: UserManagement
  }
];