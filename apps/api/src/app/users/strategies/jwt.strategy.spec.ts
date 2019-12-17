import { Test } from '@nestjs/testing';
import { ConfigService } from '@psb-shared';
import { AccessTokenPayload } from '../payload';
import { UserEntity } from '../user.entity';
import { UsersService } from '../users.service';
import { JwtStrategy } from './jwt.strategy';

jest.mock('../users.service');

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;
  let userService: UsersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        UsersService,
        {
          provide: ConfigService,
          useValue: {
            get jwtSecret(): string {
              return 'secret';
            },
          },
        },
      ],
    }).compile();

    jwtStrategy = module.get(JwtStrategy);
    userService = module.get(UsersService);
  });

  describe('validate', () => {
    it('should return user associated with the payload', async () => {
      const user: UserEntity = { id: 1, email: 'Name', password: 'password', isEmailVerified: false };
      const userServiceFindOneByIdSpy = jest.spyOn(userService, 'findOneById').mockImplementation(async () => user);
      const payload: AccessTokenPayload = { sub: 1, iat: 1, exp: 3601, type: 'access', email: 'Name' };
      expect(await jwtStrategy.validate(payload)).toEqual(user);
      expect(userServiceFindOneByIdSpy).toBeCalledWith(user.id);
    });
  });
});
