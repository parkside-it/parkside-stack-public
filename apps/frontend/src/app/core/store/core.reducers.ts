import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { Message, MessageType } from '@psf-core/model/message';
import { setMessage, startLoading, stopLoading, unsetMessage } from './core.actions';

export interface CoreState {
  isLoading: boolean;
  message: Message | null;
}

export const coreFeatureKey = 'core';

const initialState: CoreState = {
  isLoading: false,
  message: null,
};

const _coreReducer: Function = createReducer(
  initialState,
  on(stopLoading, (state: CoreState) => ({ ...state, isLoading: false })),
  on(startLoading, (state: CoreState) => ({ ...state, isLoading: true })),
  on(setMessage, (state: CoreState, { text, messageType }: { text: string; messageType: MessageType }) => {
    const message: Message = {
      text,
      type: messageType,
    };
    return { ...state, message };
  }),
  on(unsetMessage, (state: CoreState) => ({ ...state, message: null }))
);

export function coreReducer(state: CoreState, action: Action): ActionReducer<CoreState, Action> {
  return _coreReducer(state, action);
}
