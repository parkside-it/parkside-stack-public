import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './token.payload';
@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async createTokenAsync(payload: TokenPayload): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  async verifyTokenAsync<T extends TokenPayload>(token: string): Promise<T> {
    return this.jwtService.verifyAsync<T>(token);
  }
}
