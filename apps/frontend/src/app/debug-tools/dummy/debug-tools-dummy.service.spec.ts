import { TestBed } from '@angular/core/testing';

import { DebugToolsService } from '@psf/debug-tools/debug-tools.service';
import { DebugToolsDummyModule } from '@psf/debug-tools/dummy/debug-tools-dummy.module';
import { DebugToolsDummyService } from './debug-tools-dummy.service';

describe('DebugToolsDummyService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [DebugToolsDummyModule],
    })
  );

  it('should be created', () => {
    const service: DebugToolsService = TestBed.get(DebugToolsService);
    expect(service).toBeInstanceOf(DebugToolsDummyService);
  });
});
