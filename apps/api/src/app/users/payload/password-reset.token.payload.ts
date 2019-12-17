import { TokenPayload } from '@psb-shared';

export interface PasswordResetTokenPayload extends TokenPayload {
  readonly exp: number; // The "exp" (expiration time) claim identifies the expiration time.
}
