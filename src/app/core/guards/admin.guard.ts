import { inject } from '@angular/core';

import {
  CanActivateFn,
  Router
} from '@angular/router';

export const adminGuard: CanActivateFn = () => {

  const router = inject(Router);

  const raw = localStorage.getItem(
    'loggedInUser'
  );

  console.log('RAW:', raw);

  if (!raw) {

    return router.createUrlTree(['/']);
  }

  const data = JSON.parse(raw);

  console.log('PARSED:', data);

  console.log('ROLE:', data.user.role);

  // CHECK ADMIN
  if (
    data.user.role === 'Admin'
  ) {

    return true;
  }

  return router.createUrlTree(['/']);
};