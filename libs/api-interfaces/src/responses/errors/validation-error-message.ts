import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ValidationErrorMessage {
  @ApiPropertyOptional({
    type: 'object',
    additionalProperties: {
      type: 'string',
    },
    example: {
      jwt: 'not-a-jwt',
    },
  })
  target: object;
  @ApiPropertyOptional({ example: 'not-a-jwt' })
  value: string;
  @ApiPropertyOptional({ example: 'jwt' })
  property: string;
  @ApiPropertyOptional({ type: [String], example: [] })
  children: string[];
  @ApiPropertyOptional({
    type: 'object',
    additionalProperties: {
      type: 'string',
    },
    example: {
      isJwt: 'jwt must be a jwt string',
    },
  })
  constraints: object;
}
