import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserEntity } from '../user.entity';
import { UsersService } from '../users.service';

export const local = 'local';

/**
 * Implementation of the local strategy, used to validate an existing, logged out user
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, local) {
  constructor(private readonly userService: UsersService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  /**
   * Validates an existing user
   * Parameter names must be specified in constructor
   */
  async validate(email: string, password: string): Promise<UserEntity> {
    const user = await this.userService.findOneByEmailAndPassword(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
