import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const oauthService = inject(OAuthService);
  const router = inject(Router);
  const hasIdToken = oauthService.hasValidIdToken();
  const hasAccessToken = oauthService.hasValidAccessToken();
  if (hasIdToken && hasAccessToken) {
    return true;
  }
  router.navigate(['/']);
  return false;
};
