import { inject } from '@angular/core';

import {
  CanActivateFn,
  Router
} from '@angular/router';

export const adminGuard: CanActivateFn = () => {

  console.log('ADMIN GUARD RUNNING');

  const router = inject(Router);

  const user = JSON.parse(
    localStorage.getItem('loggedInUser') || '{}'
  );

  // Allow Admin
  if (user.role === 'Admin') {

    return true;
  }

  // Redirect Others
  return router.createUrlTree(['/']);
};