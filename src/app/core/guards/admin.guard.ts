import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = () => {

  const router = inject(Router);

  const raw = localStorage.getItem('loggedInUser');
  
  console.log('RAW LOCALSTORAGE:', raw); // ← shows exact saved value

  if (!raw) {
    return router.createUrlTree(['/']);
  }

  const user = JSON.parse(raw);

  if (user.role?.toLowerCase() === 'admin') {
    return true;
  }

  return router.createUrlTree(['/']);
};