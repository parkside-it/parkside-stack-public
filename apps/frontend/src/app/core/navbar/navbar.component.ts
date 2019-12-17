import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AccessToken, FrontendPath } from '@parkside-stack/api-interfaces';
import { AuthService, selectAccessToken } from '@psf-auth';
import { AppState } from '@psf/app.state';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ps-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  isUserLoggedIn: boolean = false;

  constructor(public authService: AuthService, public router: Router, private store$: Store<AppState>) {}

  ngOnInit(): void {
    const accessTokenSubscription = this.store$.pipe(select(selectAccessToken)).subscribe((token: AccessToken) => {
      this.isUserLoggedIn = !!token;
    });

    this.subscriptions.push(accessTokenSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  shouldShowLoginOption(): boolean {
    return (
      !this.isUserLoggedIn &&
      (this.router.url !== `/${FrontendPath.Login}` && this.router.url !== `/${FrontendPath.Register}`)
    );
  }
}
