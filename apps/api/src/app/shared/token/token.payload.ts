export interface TokenPayload {
  readonly sub: number; // The "sub" (subject) claim identifies the principal that is the subject of the JWT.
  readonly iat: number; // The "iat" (issued at) claim identifies the time at which the JWT was issued.
  readonly exp: number; // The "exp" (expiration time) claim identifies the expiration time.
  readonly type: string;
}
