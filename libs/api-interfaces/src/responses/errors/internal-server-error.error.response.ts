import { ApiProperty } from '@nestjs/swagger';
import { ErrorResponse } from './error.response';

export class InternalServerErrorErrorResponse implements ErrorResponse {
  @ApiProperty({ example: '500' })
  statusCode: number;
  @ApiProperty({ example: 'Internal Server Error' })
  error: string;
}
