import { createAction, props } from '@ngrx/store';
import { MessageType } from '@psf-core/model/message';

const scope = {
  core: '[Core] ',
};

export const startLoading = createAction(`${scope.core} Start loading`);
export const stopLoading = createAction(`${scope.core} Stop loading`);
export const setMessage = createAction(
  `${scope.core} Set error message`,
  props<{ text: string; messageType: MessageType }>()
);
export const unsetMessage = createAction(`${scope.core} Unset error message`);
