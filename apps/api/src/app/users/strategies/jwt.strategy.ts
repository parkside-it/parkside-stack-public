import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@parkside-stack/api-interfaces';
import { ConfigService, TokenPayload } from '@psb-shared';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PayloadType } from '../payload';
import { UsersService } from '../users.service';

export const jwt = 'jwt';

/**
 * Implementation of the jwt strategy, used to validate the logged in user
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, jwt) {
  constructor(private readonly userService: UsersService, configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.jwtSecret,
    });
  }

  /**
   * Extra user validation, JWT checks are already performed by `passport`
   */
  async validate(payload: TokenPayload): Promise<User> {
    if (payload.type !== PayloadType.Access) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.findOneById(payload.sub);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
