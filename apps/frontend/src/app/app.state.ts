import { AuthState } from '@psf-auth';
import { CoreState } from '@psf-core';

export interface AppState {
  core: CoreState;
  auth: AuthState;
}

export const coreState = (state: AppState): CoreState => state.core;
export const selectAuth = (state: AppState): AuthState => state.auth;
