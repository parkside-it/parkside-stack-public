import { ApiProperty } from '@nestjs/swagger';
import { ErrorResponse } from './error.response';

export class NotFoundErrorResponse implements ErrorResponse {
  @ApiProperty({ example: '404' })
  statusCode: number;
  @ApiProperty({ example: 'Not Found' })
  error: string;
}
