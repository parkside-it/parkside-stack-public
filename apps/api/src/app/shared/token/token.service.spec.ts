import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { UserEntity } from '@psb-users';
import { TokenService } from '.';
import { ConfigService } from '../config';

jest.mock('@nestjs/jwt');

describe('TokenService', () => {
  let tokenService: TokenService;
  let jwtService: JwtService;
  let configService: ConfigService;
  const user: UserEntity = {
    id: 42,
    email: 'john@doe.at',
    password: 'secret',
    isEmailVerified: false,
  };
  const expirationSeconds = 3600;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module = await Test.createTestingModule({
      providers: [
        TokenService,
        JwtService,
        {
          provide: ConfigService,
          useValue: {
            get accessTokenExpirationSeconds(): number {
              return expirationSeconds;
            },
            get passwordResetTokenExpirationSeconds(): number {
              return expirationSeconds;
            },
          },
        },
      ],
    }).compile();

    tokenService = module.get(TokenService);
    jwtService = module.get(JwtService);
    configService = module.get(ConfigService);
  });

  describe('createTokenAsync', () => {
    it('should return token string', async () => {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.phyR3Ly29jg2-DedS2ARAA75Wj6eIQ9_di3sVECqzkg';

      const now = 1572249511;

      const signAsyncPayload = {
        sub: user.id,
        iat: now,
        exp: now + expirationSeconds,
        type: 'access',
        email: user.email,
      };

      const jwtServiceSignAsyncSpy = jest.spyOn(jwtService, 'signAsync').mockImplementation(async () => token);
      expect(await tokenService.createTokenAsync(signAsyncPayload)).toEqual(token);
      expect(jwtServiceSignAsyncSpy).toBeCalledWith(signAsyncPayload);
    });
  });

  describe('verifyTokenAsync', () => {
    it('should return validated token', async () => {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.phyR3Ly29jg2-DedS2ARAA75Wj6eIQ9_di3sVECqzkg';
      const jwt: object = {
        iat: 1516239022,
        email: 'John Doe',
        sub: '1234567890',
      };

      const verifyAsyncSpy = jest.spyOn(jwtService, 'verifyAsync').mockImplementation(async () => jwt);
      expect(await tokenService.verifyTokenAsync(token)).toEqual(jwt);
      expect(verifyAsyncSpy).toBeCalledWith(token);
    });
  });
});
