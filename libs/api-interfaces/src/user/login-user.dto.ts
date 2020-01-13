import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'me@home.at' })
  @Length(3, 254)
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Super$3cretPa55word', required: true })
  @Length(8, 128)
  @IsString()
  password: string;
}
