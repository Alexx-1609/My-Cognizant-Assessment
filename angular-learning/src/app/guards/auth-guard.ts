import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {

  const router = inject(Router);

  const isLoggedIn = localStorage.getItem('loggedIn');

  if (isLoggedIn === 'true') {
    return true;
  }

  router.navigate(['/login']);

  return false;

};