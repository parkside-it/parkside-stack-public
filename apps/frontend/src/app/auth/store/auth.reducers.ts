import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { AccessToken, User } from '@parkside-stack/api-interfaces';
import {
  login,
  loginError,
  loginRegister,
  loginSuccess,
  register,
  registerError,
  registerSuccess,
  setUser,
  unsetUser,
  verify,
  verifyError,
  verifySuccess,
} from './auth.actions';

export interface AuthState {
  accessToken: AccessToken | null;
  user: User | null;
  loginError: boolean;
  registerError: boolean;
  verifyError: boolean;
}

export const authFeatureKey = 'auth';

const initialState: AuthState = {
  accessToken: null,
  user: null,
  loginError: false,
  registerError: false,
  verifyError: false,
};

const _authReducer: Function = createReducer(
  initialState,
  on(login, loginRegister, (state: AuthState) => ({ ...state, loginError: false })),
  on(loginSuccess, (state: AuthState, { accessToken }: { accessToken: AccessToken }) => ({
    ...state,
    accessToken,
    loginError: false,
  })),
  on(loginError, (state: AuthState) => ({ ...state, loginError: true })),
  on(register, (state: AuthState) => ({ ...state, registerError: false })),
  on(registerSuccess, (state: AuthState, { user }: { user: User }) => ({ ...state, user, registerError: false })),
  on(registerError, (state: AuthState) => ({ ...state, registerError: true })),
  on(setUser, (state: AuthState, { user }: { user: User }) => ({ ...state, user })),
  on(unsetUser, (state: AuthState) => ({ ...state, user: null, accessToken: null })),
  on(verify, (state: AuthState) => ({ ...state, verifyError: false })),
  on(verifyError, (state: AuthState) => ({ ...state, verifyError: true })),
  on(verifySuccess, (state: AuthState, { user }: { user: User }) => ({ ...state, verifyError: false, user }))
);

export function authReducer(state: AuthState, action: Action): ActionReducer<AuthState, Action> {
  return _authReducer(state, action);
}
