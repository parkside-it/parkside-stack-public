import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class LoginUserDto {
  @ApiModelProperty({ example: 'me@home.at' })
  @Length(3, 254)
  @IsEmail()
  email: string;

  @ApiModelProperty({ example: 'Super$3cretPa55word', required: true })
  @Length(8, 128)
  @IsString()
  password: string;
}
