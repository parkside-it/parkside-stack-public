import { ApiProperty } from '@nestjs/swagger';
import { ErrorResponse } from './error.response';

export class UnauthorizedErrorResponse implements ErrorResponse {
  @ApiProperty({ example: '401' })
  statusCode: number;
  @ApiProperty({ example: 'Unauthorized' })
  error: string;
}
