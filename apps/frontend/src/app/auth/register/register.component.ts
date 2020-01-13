import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AccessTokenResponse, CreateUserDto, User } from '@parkside-stack/api-interfaces';
import { MessageType } from '@psf-core/model/message';
import { setMessage } from '@psf-core/store/core.actions';
import { LocalStorageKeys } from '@psf-shared';
import { AppState } from '@psf/app.state';
import { Subscription } from 'rxjs';
import { loginRegister, register } from '../store/auth.actions';
import { selectAccessToken, selectLoginError, selectRegisterError, selectUser } from '../store/auth.selectors';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  createUserDto: CreateUserDto;
  private subscriptions: Subscription[] = [];

  @ViewChild('loginErrorMessage', { static: false }) loginErrorMessage: ElementRef;
  @ViewChild('registerErrorMessage', { static: false }) registerErrorMessage: ElementRef;

  constructor(private router: Router, private store$: Store<AppState>) {
    this.isLoading = false;
  }

  ngOnInit(): void {
    const loadingSubscription = this.store$
      .pipe(select((state: AppState) => state.core.isLoading))
      .subscribe((isLoading: boolean) => {
        this.isLoading = isLoading;
      });

    const userSubscription = this.store$.select(selectUser).subscribe((user: User) => {
      if (user) {
        this.store$.dispatch(loginRegister({ loginUserDto: this.createUserDto }));
      }
    });

    const tokenSubscription = this.store$.select(selectAccessToken).subscribe((accessToken: AccessTokenResponse) => {
      if (accessToken) {
        localStorage.setItem(LocalStorageKeys.UserToken, accessToken.accessToken);
        this.router.navigate(['/verify']);
      }
    });

    const loginErrorSubscription = this.store$.select(selectLoginError).subscribe((error: boolean) => {
      if (error && this.loginErrorMessage) {
        this.store$.dispatch(
          setMessage({ text: this.loginErrorMessage.nativeElement.textContent, messageType: MessageType.error })
        );
      }
    });

    const registerErrorSubscription = this.store$.select(selectRegisterError).subscribe((error: boolean) => {
      if (error && this.registerErrorMessage) {
        this.store$.dispatch(
          setMessage({ text: this.registerErrorMessage.nativeElement.textContent, messageType: MessageType.error })
        );
      }
    });

    this.subscriptions.push(
      loadingSubscription,
      userSubscription,
      tokenSubscription,
      loginErrorSubscription,
      registerErrorSubscription
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  register(registerForm: NgForm): void {
    this.createUserDto = {
      email: registerForm.form.value.email,
      password: registerForm.value.password,
    };
    this.store$.dispatch(register({ createUserDto: this.createUserDto }));
  }
}
