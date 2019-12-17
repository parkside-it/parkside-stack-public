import { createSelector } from '@ngrx/store';
import { AccessToken, User } from '@parkside-stack/api-interfaces';
import { AppState } from '../../app.state';
import { AuthState } from './auth.reducers';

const selectAuthState = (state: AppState): AuthState | null => state.auth;

export const selectAccessToken = createSelector(
  selectAuthState,
  (auth: AuthState): AccessToken | null => auth.accessToken
);

export const selectLoginError = createSelector(
  selectAuthState,
  (auth: AuthState): boolean => auth.loginError
);

export const selectRegisterError = createSelector(
  selectAuthState,
  (auth: AuthState): boolean => auth.registerError
);

export const selectVerifyError = createSelector(
  selectAuthState,
  (auth: AuthState): boolean => auth.verifyError
);

export const selectUser = createSelector(
  selectAuthState,
  (auth: AuthState): User | null => auth.user
);

export const selectUserName = createSelector(
  selectUser,
  (user: User) => (user ? user.email : '')
);
