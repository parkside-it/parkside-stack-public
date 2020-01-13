import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class User {
  @ApiProperty({ example: 21 })
  id: number;

  @ApiProperty({ example: 'me@home.at' })
  email: string;

  @Exclude()
  @ApiPropertyOptional({ example: 'password', readOnly: true })
  password?: string;

  @ApiProperty({ example: true })
  isEmailVerified: boolean;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
