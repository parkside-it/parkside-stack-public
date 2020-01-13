import { AuthState } from '@psf-auth';
import { CoreState } from '@psf-core';

export interface AppState {
  core: CoreState;
  auth: AuthState;
}
