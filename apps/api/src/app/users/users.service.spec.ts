import { MailerService } from '@nest-modules/mailer';
import { BadRequestException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConfigService, CryptoService, TokenService } from '@psb-shared';
import { I18nService } from 'nestjs-i18n';
import { InsertResult, Repository } from 'typeorm';
import { EmailVerificationTokenPayload, PayloadService, PayloadType } from './payload';
import { UserEntity } from './user.entity';
import { UsersService } from './users.service';

jest.mock('../shared/token/token.service');
jest.mock('../shared/config/config.service');
jest.mock('@nest-modules/mailer');
jest.mock('typeorm/repository/Repository');
jest.mock('./payload/payload.service');
jest.mock('nestjs-i18n');

describe('UserService', () => {
  let userService: UsersService;
  let mailerService: MailerService;
  let tokenService: TokenService;
  let cryptoService: CryptoService;
  let userEntityRepository: Repository<UserEntity>;
  let i18nService: I18nService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
        MailerService,
        TokenService,
        ConfigService,
        CryptoService,
        PayloadService,
        I18nService,
      ],
    }).compile();

    userService = module.get(UsersService);
    mailerService = module.get(MailerService);
    tokenService = module.get(TokenService);
    cryptoService = module.get(CryptoService);
    userEntityRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
    i18nService = module.get(I18nService);
  });

  describe('findOneById', () => {
    it('should return user', async () => {
      const user: UserEntity = { id: 1, email: 'Name1', password: 'password1', isEmailVerified: true };
      jest.spyOn(userEntityRepository, 'findOne').mockImplementation(async () => user);

      expect(await userService.findOneById(user.id)).toEqual(user);
    });

    it('should return an empty User object', async () => {
      jest.spyOn(userEntityRepository, 'findOne').mockImplementation(async () => undefined);

      expect(await userService.findOneById(1)).toBeUndefined();
    });
  });

  describe('findAll', () => {
    it('should return user array', async () => {
      const users: UserEntity[] = [
        { id: 1, email: 'Name1', password: 'password', isEmailVerified: true },
        { id: 2, email: 'Name2', password: 'password', isEmailVerified: true },
        { id: 3, email: 'Name3', password: 'password', isEmailVerified: true },
      ];
      jest.spyOn(userEntityRepository, 'find').mockImplementation(async () => users);

      expect(await userService.findAll()).toEqual(users);
    });

    it('should return an empty array if nothing found', async () => {
      jest.spyOn(userEntityRepository, 'find').mockImplementation(async () => []);

      expect(await userService.findAll()).toEqual([]);
    });
  });

  describe('create', () => {
    it('should return the created user', async () => {
      const name = 'new name';
      const password = 'password';
      const user: UserEntity = { id: 1, email: name, password: password, isEmailVerified: false };
      const createUserDto = { email: name, password: password };
      const result = new InsertResult();
      result.identifiers = [{ id: 1 }];
      jest.spyOn(userEntityRepository, 'insert').mockImplementation(async () => result);
      jest.spyOn(userEntityRepository, 'findOne').mockImplementation(async () => user);
      jest.spyOn(mailerService, 'sendMail').mockImplementation(async () => {});
      jest.spyOn(i18nService, 'translate').mockImplementation((): string => 'email subject');

      expect(await userService.create(createUserDto, 'en')).toEqual(user);
    });
  });

  describe('deleteById', () => {
    it('should return true on success', async () => {
      jest.spyOn(userEntityRepository, 'delete').mockImplementation(async () => ({ raw: '', affected: 1 }));

      await userService.deleteById(1);
    });

    it('should return false on success', async () => {
      jest.spyOn(userEntityRepository, 'delete').mockImplementation(async () => ({ raw: '', affected: 0 }));

      await userService.deleteById(1);
    });
  });

  describe('findOneByEmailAndPassword', () => {
    const user: UserEntity = { id: 1, email: 'mail@me.com', password: 'password', isEmailVerified: true };
    it('should return a user object', async () => {
      const hashedPassword = await cryptoService.hash(user.password);
      const userHashed: UserEntity = { ...user, password: hashedPassword };
      jest.spyOn(userService, 'findOneByEmail').mockImplementation(async () => userHashed);
      expect(await userService.findOneByEmailAndPassword(user.email, user.password)).toEqual(userHashed);
    });

    it('should return undefined if user was not found', async () => {
      jest.spyOn(userService, 'findOneByEmail').mockImplementation(async () => undefined);

      expect(await userService.findOneByEmailAndPassword('my name', 'password')).toBeUndefined();
    });

    it('should return undefined if passwords do not match', async () => {
      jest.spyOn(userService, 'findOneByEmail').mockImplementation(async () => user);

      expect(await userService.findOneByEmailAndPassword(user.email, 'not the correct one')).toBeUndefined();
    });
  });

  describe('verification', () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.phyR3Ly29jg2-DedS2ARAA75Wj6eIQ9_di3sVECqzkg';

    it('should throw bad request exception because of invalid token', async () => {
      const tokenServiceVerifyTokenAsyncSpy = jest
        .spyOn(tokenService, 'verifyTokenAsync')
        .mockImplementation(async () => {
          throw new Error('invalid token error');
        });

      await expect(userService.verification(token)).rejects.toThrow(BadRequestException);
      expect(tokenServiceVerifyTokenAsyncSpy).toBeCalledWith(token);
    });

    it('should throw bad request exception because user was not found', async () => {
      const emailVerificationPayload: EmailVerificationTokenPayload = {
        sub: 42,
        iat: 1,
        exp: 1001,
        type: PayloadType.EmailVerification,
        email: 'no@user.com',
      };

      const tokenServiceVerifyTokenAsyncSpy = jest
        .spyOn(tokenService, 'verifyTokenAsync')
        .mockImplementation(async () => emailVerificationPayload);
      const userRepositoryFindOneSpy = jest
        .spyOn(userEntityRepository, 'findOne')
        .mockImplementation(async () => undefined);

      await expect(userService.verification(token)).rejects.toThrow(BadRequestException);
      expect(tokenServiceVerifyTokenAsyncSpy).toBeCalledWith(token);
      expect(userRepositoryFindOneSpy).toBeCalledWith({ id: emailVerificationPayload.sub });
    });

    it('should throw bad request exception because token email and user email are not equal', async () => {
      const user: UserEntity = {
        id: 42,
        password: 'password',
        email: 'john@doe.at',
        isEmailVerified: false,
      };

      const emailVerificationPayload: EmailVerificationTokenPayload = {
        sub: user.id,
        iat: 1,
        exp: 1001,
        type: PayloadType.EmailVerification,
        email: 'not@same.at',
      };

      const tokenServiceVerifyTokenAsyncSpy = jest
        .spyOn(tokenService, 'verifyTokenAsync')
        .mockImplementation(async () => emailVerificationPayload);
      const userRepositoryFindOneSpy = jest.spyOn(userEntityRepository, 'findOne').mockImplementation(async () => user);

      await expect(userService.verification(token)).rejects.toThrow(BadRequestException);
      expect(tokenServiceVerifyTokenAsyncSpy).toBeCalledWith(token);
      expect(userRepositoryFindOneSpy).toBeCalledWith({ id: emailVerificationPayload.sub });
    });

    it('should return the verified user', async () => {
      const user: UserEntity = {
        id: 42,
        password: 'password',
        email: 'john@doe.at',
        isEmailVerified: false,
      };

      const emailVerificationPayload: EmailVerificationTokenPayload = {
        sub: user.id,
        iat: 1,
        exp: 1001,
        type: PayloadType.EmailVerification,
        email: user.email,
      };

      const tokenServiceVerifyTokenAsyncSpy = jest
        .spyOn(tokenService, 'verifyTokenAsync')
        .mockImplementation(async () => emailVerificationPayload);
      const userRepositoryFindOneSpy = jest.spyOn(userEntityRepository, 'findOne').mockImplementation(async () => user);
      const userRepositoryUpdateSpy = jest.spyOn(userEntityRepository, 'update').mockImplementation();

      expect(await userService.verification(token)).toEqual(user);
      expect(tokenServiceVerifyTokenAsyncSpy).toBeCalledWith(token);
      expect(userRepositoryFindOneSpy).toBeCalledWith({ id: emailVerificationPayload.sub });
      user.isEmailVerified = true;
      expect(userRepositoryUpdateSpy).toBeCalledWith(user.id, user);
    });
  });
});
