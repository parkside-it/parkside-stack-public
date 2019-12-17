import { ApiModelProperty } from '@nestjs/swagger';

export class User {
  @ApiModelProperty({ example: 21 })
  id: number;

  @ApiModelProperty({ example: 'me@home.at' })
  email: string;

  @ApiModelProperty({ example: 'password' })
  password?: string;

  @ApiModelProperty({ example: true })
  isEmailVerified: boolean;
}
