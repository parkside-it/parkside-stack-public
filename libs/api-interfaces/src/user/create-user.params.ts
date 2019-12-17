import { environment } from '@psb-environments';
import { IsDefined, IsIn } from 'class-validator';

export class CreateUserParams {
  @IsDefined()
  @IsIn(environment.supportedLocales)
  locale: string;
}
