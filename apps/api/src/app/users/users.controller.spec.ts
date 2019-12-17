import { MailerService } from '@nest-modules/mailer';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AccessToken, CreateUserDto, CreateUserParams, LoginUserDto, User } from '@parkside-stack/api-interfaces';
import { CryptoService, TokenService } from '@psb-shared';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

jest.mock('typeorm/repository/Repository');
jest.mock('./users.service');
jest.mock('@nest-modules/mailer');
jest.mock('@nestjs/jwt');
jest.mock('../shared/token/token.service');

describe('Auth Controller', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  let tokenService: TokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
        TokenService,
        MailerService,
        CryptoService,
      ],
    }).compile();

    usersController = module.get(UsersController);
    usersService = module.get(UsersService);
    tokenService = module.get(TokenService);
  });

  describe('register', () => {
    it('should return created user', async () => {
      const createUserDto: CreateUserDto = { email: 'Name', password: 'password' };
      const userEntity: UserEntity = { id: 1, email: 'Name', password: 'password', isEmailVerified: false };
      jest.spyOn(usersService, 'create').mockImplementation(async () => userEntity);

      const user: User = userEntity;
      const headers: CreateUserParams = { locale: 'en' };
      expect(await usersController.register(createUserDto, headers)).toEqual(user);
    });
  });

  describe('login', () => {
    it('should return an access token', async () => {
      const accessToken: AccessToken = { accessToken: 'jwt' };
      const loginUserDto: LoginUserDto = { email: 'Name', password: 'password' };
      jest.spyOn(usersService, 'createAccessToken').mockImplementation(async () => accessToken);

      expect(await usersController.login(loginUserDto)).toEqual(accessToken);
    });
  });

  describe('me', () => {
    it('meshould return the user object', async () => {
      const user: User = { id: 1, email: 'Name', isEmailVerified: true };

      expect(await usersController.me({ user: user })).toEqual(user);
    });
  });
});
