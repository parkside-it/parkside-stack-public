import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@psb-shared';
import { UserEntity, UsersModule } from '@psb-users';
import * as path from 'path';

@Module({
  imports: [
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
