import { Injectable } from '@nestjs/common';
import { ConfigService } from '@psb-shared';
import { AccessTokenPayload } from './access.token.payload';
import { EmailVerificationTokenPayload } from './email-verification.token.payload';
import { PasswordResetTokenPayload } from './password-reset.token.payload';

@Injectable()
export class PayloadService {
  secondInMiliseconds: number = 1000;

  constructor(private readonly configService: ConfigService) {}

  createEmailVerificationTokenPayload(sub: number, email: string): EmailVerificationTokenPayload {
    return {
      sub,
      iat: this.dateNowInSeconds(),
      type: 'email verification',
      email,
    };
  }

  createAccessTokenPayload(sub: number, email: string): AccessTokenPayload {
    return {
      sub,
      iat: this.dateNowInSeconds(),
      type: 'access',
      email,
      exp: this.dateNowInSeconds() + this.configService.accessTokenExpirationSeconds,
    };
  }

  createPasswordResetTokenPayload(sub: number): PasswordResetTokenPayload {
    return {
      sub,
      iat: this.dateNowInSeconds(),
      type: 'password reset',
      exp: this.dateNowInSeconds() + this.configService.passwordResetTokenExpirationSeconds,
    };
  }

  private dateNowInSeconds(): number {
    return Math.round(Date.now() / this.secondInMiliseconds);
  }
}
