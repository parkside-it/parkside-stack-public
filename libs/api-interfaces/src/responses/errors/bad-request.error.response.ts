import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ErrorResponse } from './error.response';
import { ValidationErrorMessage } from './validation-error-message';
export class BadRequestErrorResponse implements ErrorResponse {
  @ApiProperty({ example: '400' })
  statusCode: number;
  @ApiProperty({ example: 'Bad Request' })
  error: string;
  @ApiPropertyOptional({
    description: 'string | ValidationErrorMessage[]',
    type: ValidationErrorMessage,
    isArray: true,
  })
  message?: ValidationErrorMessage[];
}
