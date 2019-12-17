import { MailerService } from '@nest-modules/mailer';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessToken, CreateUserDto, FrontendPath, Response, User } from '@parkside-stack/api-interfaces';
import { ConfigService, CryptoService, TokenService } from '@psb-shared';
import { Repository } from 'typeorm';
import { EmailVerificationTokenPayload, PayloadService } from './payload';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    private readonly mailerService: MailerService,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
    private readonly cryptoService: CryptoService,
    private readonly payloadService: PayloadService
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
    if (!updatedUser) {
      throw new InternalServerErrorException(`just created user with id ${userId} could not be found`);
    }
    const emailVerificationTokenPayload = this.payloadService.createEmailVerificationTokenPayload(
      updatedUser.id,
      updatedUser.email
    );
    const emailVerificationToken = await this.tokenService.createTokenAsync(emailVerificationTokenPayload);

    this.mailerService
      .sendMail({
        to: createUserDto.email,
        subject: 'Verify Your Email Address',
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

  async createAccessToken(user: UserEntity): Promise<AccessToken> {
    const accessTokenPayload = this.payloadService.createAccessTokenPayload(user.id, user.email);
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

  async deleteById(id: number): Promise<Response> {
    const { affected }: { affected?: number } = await this.userRepository.delete(id);
    return { success: !!affected };
  }

  async verification(token: string): Promise<User> {
    let payload: EmailVerificationTokenPayload;

    try {
      payload = await this.tokenService.verifyTokenAsync(token);
    } catch (error) {
      throw new BadRequestException('invalid token');
    }

    const userId = payload['sub'];

    const user = await this.findOneById(userId);
    if (user === undefined) {
      throw new NotFoundException('user not found');
    }

    if (user.email === payload.email) {
      user.isEmailVerified = true;
    } else {
      throw new BadRequestException('token cannot be used to verify current user email');
    }

    return this.update(user);
  }
}
