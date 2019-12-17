import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { DebugToolsService } from '@psf/debug-tools/debug-tools.service';
import { DebugToolsRealModule } from '@psf/debug-tools/real/debug-tools-real.module';
import { DebugToolsRealService } from './debug-tools-real.service';

describe('DebugToolsRealService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [DebugToolsRealModule, RouterTestingModule, HttpClientTestingModule],
      providers: [provideMockStore()],
    })
  );

  it('should be created', () => {
    const service: DebugToolsService = TestBed.get(DebugToolsService);
    expect(service).toBeInstanceOf(DebugToolsRealService);
  });
});
