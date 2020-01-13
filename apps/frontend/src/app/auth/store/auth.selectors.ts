import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AccessTokenResponse, User } from '@parkside-stack/api-interfaces';
import { authFeatureKey, AuthState } from './auth.reducers';

const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const selectAccessToken = createSelector(
  selectAuthState,
  (auth: AuthState): AccessTokenResponse | null => auth.accessToken
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
