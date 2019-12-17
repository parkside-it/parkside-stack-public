import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AccessToken, CreateUserDto, LoginUserDto, User, VerificationParams } from '@parkside-stack/api-interfaces';
import { startLoading, stopLoading } from '@psf-core';
import { AppState } from '@psf/app.state';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import {
  login,
  loginError,
  loginRegister,
  loginSuccess,
  register,
  registerError,
  registerSuccess,
  verify,
  verifyError,
  verifySuccess,
} from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private auth: AuthService, private store$: Store<AppState>) {}

  login$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(login, loginRegister),
      tap(() => {
        this.store$.dispatch(startLoading());
      }),
      switchMap(({ loginUserDto }: { loginUserDto: LoginUserDto }) =>
        this.auth.login(loginUserDto).pipe(
          map((result: Object) => {
            const accessToken: AccessToken = { accessToken: result['accessToken'] };
            return loginSuccess({ accessToken });
          }),
          catchError(() => {
            return of(loginError());
          })
        )
      ),
      tap(() => {
        this.store$.dispatch(stopLoading());
      })
    )
  );

  register$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(register),
      tap(() => {
        this.store$.dispatch(startLoading());
      }),
      switchMap(({ createUserDto }: { createUserDto: CreateUserDto }) => {
        return this.auth.register(createUserDto).pipe(
          map((user: User) => {
            return registerSuccess({ user });
          }),
          catchError(() => {
            return of(registerError());
          })
        );
      }),
      tap(() => {
        this.store$.dispatch(stopLoading());
      })
    )
  );

  verify$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(verify),
      tap(() => {
        this.store$.dispatch(startLoading());
      }),
      switchMap(({ verificationParams }: { verificationParams: VerificationParams }) => {
        return this.auth.verifyUser(verificationParams).pipe(
          map((user: User) => {
            return verifySuccess({ user });
          }),
          catchError(() => {
            return of(verifyError());
          })
        );
      }),
      tap(() => {
        this.store$.dispatch(stopLoading());
      })
    )
  );
}
