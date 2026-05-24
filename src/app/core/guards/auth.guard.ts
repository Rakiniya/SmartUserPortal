import { inject } from '@angular/core';

import {
  CanActivateFn,
  Router
} from '@angular/router';

export const authGuard: CanActivateFn = () => {

  console.log('AUTH GUARD RUNNING');

  const router = inject(Router);

  const user = localStorage.getItem('loggedInUser');

  if (user) {

    return true;
  }

  return router.createUrlTree(['/']);
};