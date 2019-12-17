// tslint:disable:max-classes-per-file
import { ApiModelProperty } from '@nestjs/swagger';

export interface Message {
  message: string;
}

export class Response {
  @ApiModelProperty({ example: true })
  success: boolean;
}

export class AccessToken {
  @ApiModelProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC ...' })
  accessToken: string;
}
