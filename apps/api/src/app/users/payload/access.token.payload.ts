import { TokenPayload } from '@psb-shared';

export interface AccessTokenPayload extends TokenPayload {
  readonly email: string;
  readonly exp: number;
}
