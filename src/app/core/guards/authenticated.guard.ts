import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/login/auth.service';
import { inject } from '@angular/core';

export const AuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated()
    ? (router.navigate(['/dashboard']))
    :  true;


};
