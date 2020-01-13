import { ValidationErrorMessage } from './validation-error-message';

export interface ErrorResponse {
  statusCode: number;
  error: string;
  message?: string | ValidationErrorMessage[];
}
