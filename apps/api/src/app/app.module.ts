import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environment } from '@psb-environments';
import { ConfigModule, ConfigService } from '@psb-shared';
import { UserEntity, UsersModule } from '@psb-users';
import { I18nModule, I18nOptions } from 'nestjs-i18n';
import * as path from 'path';

@Module({
  imports: [
    I18nModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService): I18nOptions => ({
        path: configService.translationDirectory,
        fallbackLanguage: environment.fallbackLocale,
        filePattern: '*.json',
        resolvers: [],
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService): {} => ({
        type: 'mysql',
        host: configService.dbHost,
        port: configService.dbPort,
        username: configService.dbUser,
        password: configService.dbPassword,
        database: configService.dbDatabase,
        entities: [UserEntity],
        synchronize: configService.env !== 'production',
      }),
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService): {} => ({
        transport: configService.emailSmtpSecret,
        defaults: {
          from: configService.emailDefaultSender,
        },
        template: {
          dir: path.resolve(configService.emailTemplateDirectory),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
})
export class AppModule {}
