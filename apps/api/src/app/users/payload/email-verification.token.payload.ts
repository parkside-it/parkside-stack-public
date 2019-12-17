import { TokenPayload } from '@psb-shared';

export interface EmailVerificationTokenPayload extends TokenPayload {
  readonly email: string;
}
