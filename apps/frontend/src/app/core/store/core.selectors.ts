import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Message } from '@psf-core/model/message';
import { coreFeatureKey, CoreState } from './core.reducers';

const selectCoreState = createFeatureSelector<CoreState>(coreFeatureKey);

export const selectMessage = createSelector(
  selectCoreState,
  (state: CoreState): Message | null => state.message
);

export const selectIsLoading = createSelector(
  selectCoreState,
  (state: CoreState): boolean => state.isLoading
);
