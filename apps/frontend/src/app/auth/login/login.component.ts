import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AccessTokenResponse, LoginUserDto, User } from '@parkside-stack/api-interfaces';
import { MessageType } from '@psf-core/model/message';
import { setMessage } from '@psf-core/store/core.actions';
import { selectIsLoading } from '@psf-core/store/core.selectors';
import { LocalStorageKeys } from '@psf-shared';
import { AppState } from '@psf/app.state';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { login, setUser } from '../store/auth.actions';
import { selectAccessToken, selectLoginError } from '../store/auth.selectors';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  isUserLoggedIn: boolean = false;
  private subscriptions: Subscription[] = [];

  @ViewChild('loginErrorMessage', { static: false }) loginErrorMessage: ElementRef;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store$: Store<AppState>,
    private activatedRoute: ActivatedRoute
  ) {
    this.isLoading = false;
  }

  ngOnInit(): void {
    if (this.isUserLoggedIn) {
      this.router.navigate(['/']);
    }

    const loadingSubscription = this.store$.pipe(select(selectIsLoading)).subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });

    const loginErrorSubscription = this.store$.select(selectLoginError).subscribe((error: boolean) => {
      if (error && this.loginErrorMessage) {
        this.store$.dispatch(
          setMessage({ text: this.loginErrorMessage.nativeElement.textContent, messageType: MessageType.error })
        );
      }
    });

    const accessTokenSubscription = this.store$
      .select(selectAccessToken)
      .subscribe((accessToken: AccessTokenResponse) => {
        if (accessToken) {
          this.isUserLoggedIn = true;
          localStorage.setItem(LocalStorageKeys.UserToken, accessToken.accessToken);
          this.authService.me().subscribe((user: User) => {
            this.store$.dispatch(setUser({ user }));
          });

          const path: string | null = this.activatedRoute.snapshot.queryParamMap.get('redirectTo');
          if (path) {
            this.router.navigate([`/${path}`]);
          } else {
            this.router.navigate(['/']);
          }
        }
      });

    this.subscriptions.push(loadingSubscription, loginErrorSubscription, accessTokenSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  login(loginForm: NgForm): void {
    const loginUserDto: LoginUserDto = {
      email: loginForm.form.value.email,
      password: loginForm.value.password,
    };
    this.store$.dispatch(login({ loginUserDto }));
  }
}
