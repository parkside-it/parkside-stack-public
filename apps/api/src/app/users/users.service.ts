import { MailerService } from '@nest-modules/mailer';
import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessTokenResponse, CreateUserDto, FrontendPath } from '@parkside-stack/api-interfaces';
import { ConfigService, CryptoService, TokenService } from '@psb-shared';
import { I18nService } from 'nestjs-i18n';
import { Repository } from 'typeorm';
import { EmailVerificationTokenPayload, PayloadService, PayloadType } from './payload';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    private readonly mailerService: MailerService,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
    private readonly cryptoService: CryptoService,
    private readonly payloadService: PayloadService,
    private readonly i18n: I18nService
  ) {}

  async findOneById(id: number): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ id });
  }

  async findOneByEmail(email: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ email });
  }

  async findOneByEmailAndPassword(email: string, userPassword: string): Promise<UserEntity | undefined> {
    const user = await this.findOneByEmail(email);

    if (!(user && user.password && (await this.cryptoService.compareHash(userPassword, user.password)))) {
      return undefined;
    }

    return user;
  }

  async findAll(): Promise<UserEntity[]> {
    const users: UserEntity[] = await this.userRepository.find();

    if (!users) {
      return [];
    }

    return users;
  }

  async create(createUserDto: CreateUserDto, locale: string): Promise<UserEntity> {
    createUserDto.password = await this.cryptoService.hash(createUserDto.password);
    const result = await this.userRepository.insert(createUserDto);
    const userId = result.identifiers[0].id;
    const updatedUser = await this.findOneById(userId);

    if (updatedUser === undefined) {
      //created user could not be found
      throw new NotFoundException();
    }

    const emailVerificationTokenPayload = this.payloadService.createEmailVerificationTokenPayload(
      updatedUser.id,
      updatedUser.email
    );
    const emailVerificationToken = await this.tokenService.createTokenAsync(emailVerificationTokenPayload);

    this.mailerService
      .sendMail({
        to: createUserDto.email,
        subject: this.i18n.translate('messages.verification_email_subject', { lang: locale }),
        template: `welcome.${locale}.hbs`,
        context: {
          email: createUserDto.email,
          emailVerificationLink: `${this.configService.baseUrl}/${locale}/${
            FrontendPath.Verify
          }/${emailVerificationToken}`,
        },
      })
      .catch((error: any) => {
        Logger.error(error); //TODO: replace with logger service call
      });

    return updatedUser;
  }

  async createAccessToken(user: UserEntity): Promise<AccessTokenResponse> {
    const accessTokenPayload = this.payloadService.createAccessTokenPayload(user.id);
    return { accessToken: await this.tokenService.createTokenAsync(accessTokenPayload) };
  }

  private async update(user: UserEntity): Promise<UserEntity> {
    await this.userRepository.update(user.id, user);

    const updatedUser = await this.findOneById(user.id);
    if (!updatedUser) {
      throw new NotFoundException();
    }

    return updatedUser;
  }

  async deleteById(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async verification(token: string): Promise<UserEntity> {
    let payload: EmailVerificationTokenPayload;

    try {
      payload = await this.tokenService.verifyTokenAsync(token);
    } catch (error) {
      //invalid token
      throw new BadRequestException();
    }

    if (payload.type !== PayloadType.EmailVerification) {
      //invalid token type
      throw new BadRequestException();
    }

    const userId = payload['sub'];

    const user = await this.findOneById(userId);
    if (user === undefined) {
      //user not found
      throw new BadRequestException();
    }

    if (user.email === payload.email) {
      user.isEmailVerified = true;
    } else {
      //invalid token email
      throw new BadRequestException();
    }

    return this.update(user);
  }
}
