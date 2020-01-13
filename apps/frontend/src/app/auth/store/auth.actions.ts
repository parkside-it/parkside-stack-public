import { createAction, props } from '@ngrx/store';
import {
  AccessTokenResponse,
  CreateUserDto,
  LoginUserDto,
  User,
  VerificationParams,
} from '@parkside-stack/api-interfaces';

const scope = {
  login: '[Auth/login],',
  register: '[Auth/register],',
  verify: '[Auth/verify]',
};

export const login = createAction(`${scope.login} Login`, props<{ loginUserDto: LoginUserDto }>());
export const loginRegister = createAction(`${scope.register} Login`, props<{ loginUserDto: LoginUserDto }>());
export const loginSuccess = createAction(
  `${scope.login}, Login Success`,
  props<{ accessToken: AccessTokenResponse }>()
);
export const loginError = createAction(`${scope.login} Login Error`);
export const register = createAction(`${scope.register} Register User`, props<{ createUserDto: CreateUserDto }>());
export const registerSuccess = createAction(`${scope.register} Register Success`, props<{ user: User }>());
export const registerError = createAction(`${scope.register} Register Error`);
export const setUser = createAction(`[Auth/user] Set User`, props<{ user: User }>());
export const unsetUser = createAction(`[Auth/user] Unset User`);
export const verify = createAction(`${scope.verify} Verify User`, props<{ verificationParams: VerificationParams }>());
export const verifySuccess = createAction(`${scope.verify} Verify User Success`, props<{ user: User }>());
export const verifyError = createAction(`${scope.verify} Verify User Error`);
