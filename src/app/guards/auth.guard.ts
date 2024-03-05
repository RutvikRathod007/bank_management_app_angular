import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../services/auth.service';
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toast = inject(NgToastService);
  const user = authService.getUserFromLocalStorage();
  if (!authService.isAuthenticatedUser()) {
    toast.error({
      detail: 'Unauthorized access',
      summary: 'Login to get access',
      duration: 2000,
      position: 'bottomRight',
    });
    router.navigate(['/login']);
    return false;
  }

  if (user !== undefined && user.role === 'admin') {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
