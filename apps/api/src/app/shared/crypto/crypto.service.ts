import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CryptoService {
  readonly saltRounds: number = 12;

  constructor() {}

  async hash(input: string): Promise<string> {
    return bcrypt.hash(input, this.saltRounds);
  }

  async compareHash(input: string, hashToCompare: string): Promise<boolean> {
    return bcrypt.compare(input, hashToCompare);
  }
}
