import { Injectable } from '@angular/core';
import { DebugToolsService } from '@psf/debug-tools/debug-tools.service';

@Injectable()
export class DebugToolsDummyService implements DebugToolsService {
  constructor() {}

  deleteCurrentUser(): void {}
}
