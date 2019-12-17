import { createSelector } from '@ngrx/store';
import { Message } from '@psf-core/model/message';
import { AppState } from '../../app.state';
import { CoreState } from './core.reducers';

const selectCoreState = (state: AppState): CoreState | null => state.core;

export const selectMessage = createSelector(
  selectCoreState,
  (state: CoreState): Message | null => state.message
);

export const selectIsLoading = createSelector(
  selectCoreState,
  (state: CoreState): boolean => state.isLoading
);
