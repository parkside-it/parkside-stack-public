import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AccessToken, FrontendPath } from '@parkside-stack/api-interfaces';
import { AppState } from '@psf/app.state';
import { selectAccessToken } from '@psf/auth/store/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  isUserLoggedIn: boolean = false;

  constructor(private router: Router, private store$: Store<AppState>) {
    this.store$.pipe(select(selectAccessToken)).subscribe((token: AccessToken) => {
      this.isUserLoggedIn = !!token;
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const path: string = state.url.slice(1); // removes slash from url state

    if (this.isUserLoggedIn) {
      if (path === FrontendPath.Register || path === FrontendPath.ForgotPassword) {
        this.router.navigate([`/${FrontendPath.Account}`]);
        return false;
      }
    } else if (path === FrontendPath.Account) {
      this.router.navigate([`/${FrontendPath.Login}`], { queryParams: { redirectTo: path } });
      return false;
    }
    return true;
  }
}
