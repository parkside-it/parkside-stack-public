import { IsJWT } from 'class-validator';

export class VerificationParams {
  @IsJWT()
  jwt: string;
}
