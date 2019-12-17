import { UnauthorizedException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { LocalStrategy, UserEntity, UsersService } from '@psb-users';

jest.mock('../users.service');

describe('LocalStrategy', () => {
  let localStrategy: LocalStrategy;
  let userService: UsersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [LocalStrategy, UsersService],
    }).compile();

    localStrategy = module.get(LocalStrategy);
    userService = module.get(UsersService);
  });

  describe('validate', () => {
    it('should return user with valid credentials', async () => {
      const user: UserEntity = { id: 1, email: 'Name', password: 'password', isEmailVerified: false };
      jest.spyOn(userService, 'findOneByEmailAndPassword').mockImplementation(async () => user);

      expect(await localStrategy.validate(user.email, user.password || '')).toEqual(user);
    });

    it('should throw exception with no valid credentials', async () => {
      jest.spyOn(userService, 'findOneByEmailAndPassword').mockImplementation(async () => undefined);

      await expect(localStrategy.validate('name', 'password')).rejects.toThrowError(UnauthorizedException);
    });
  });
});
