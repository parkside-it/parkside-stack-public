import { Injectable } from '@angular/core';

@Injectable()
export abstract class DebugToolsService {
  abstract deleteCurrentUser(): void;
}
