import { Injectable } from '@nestjs/common';
import { ConfigService, TokenPayload } from '@psb-shared';
import { EmailVerificationTokenPayload } from './email-verification.token.payload';
import { PayloadType } from './payload-type';

@Injectable()
export class PayloadService {
  secondInMiliseconds: number = 1000;

  constructor(private readonly configService: ConfigService) {}

  createEmailVerificationTokenPayload(sub: number, email: string): EmailVerificationTokenPayload {
    return {
      sub,
      iat: this.dateNowInSeconds(),
      exp: this.dateNowInSeconds() + this.configService.emailVerificationTokenExpirationSeconds,
      type: PayloadType.EmailVerification,
      email,
    };
  }

  createAccessTokenPayload(sub: number): TokenPayload {
    return {
      sub,
      iat: this.dateNowInSeconds(),
      exp: this.dateNowInSeconds() + this.configService.accessTokenExpirationSeconds,
      type: PayloadType.Access,
    };
  }

  createPasswordResetTokenPayload(sub: number): TokenPayload {
    return {
      sub,
      iat: this.dateNowInSeconds(),
      exp: this.dateNowInSeconds() + this.configService.passwordResetTokenExpirationSeconds,
      type: PayloadType.PasswordReset,
    };
  }

  private dateNowInSeconds(): number {
    return Math.round(Date.now() / this.secondInMiliseconds);
  }
}
