import { Injectable, InternalServerErrorException } from '@nestjs/common';

/**
 * Helper class to read .env values
 */
@Injectable()
export class ConfigService {
  constructor(private readonly envConfig: { [key: string]: string | undefined }) {}

  get dbHost(): string {
    return this.checkValue(this.envConfig.DB_HOST);
  }

  get dbPort(): number {
    return Number(this.checkValue(this.envConfig.DB_PORT));
  }

  get dbUser(): string {
    return this.checkValue(this.envConfig.DB_USER);
  }

  get dbPassword(): string {
    return this.checkValue(this.envConfig.DB_PASSWORD);
  }

  get dbDatabase(): string {
    return this.checkValue(this.envConfig.DB_DATABASE);
  }

  get jwtSecret(): string {
    return this.checkValue(this.envConfig.JWT_SECRET);
  }

  get env(): string {
    return this.checkValue(this.envConfig.ENV);
  }

  get accessTokenExpirationSeconds(): number {
    return Number(this.checkValue(this.envConfig.ACCESS_TOKEN_EXPIRATION_SECONDS));
  }

  get passwordResetTokenExpirationSeconds(): number {
    return Number(this.checkValue(this.envConfig.PASSWORD_RESET_TOKEN_EXPIRATION_SECONDS));
  }

  get emailSmtpSecret(): string {
    return this.checkValue(this.envConfig.EMAIL_SMTP_SECRET);
  }

  get emailDefaultSender(): string {
    return this.checkValue(this.envConfig.EMAIL_DEFAULT_SENDER);
  }

  get emailTemplateDirectory(): string {
    return this.checkValue(this.envConfig.EMAIL_TEMPLATE_DIRECTORY);
  }

  get baseUrl(): string {
    return this.checkValue(this.envConfig.BASE_URL);
  }

  private checkValue(value: string | undefined): string {
    if (!value) {
      throw new InternalServerErrorException('environment variable could not be resolved');
    }

    return value;
  }
}
