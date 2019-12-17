import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { provideMockStore } from '@ngrx/store/testing';
import { SharedModule } from '@psf-shared';
import { DebugToolsService } from '@psf/debug-tools/debug-tools.service';
import { DebugToolsRealService } from '@psf/debug-tools/real/debug-tools-real.service';
import { DebugToolsRealComponent } from './debug-tools-real.component';

describe('RealComponent', () => {
  let component: DebugToolsRealComponent;
  let fixture: ComponentFixture<DebugToolsRealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DebugToolsRealComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, SharedModule],
      providers: [
        {
          provide: DebugToolsService,
          useClass: DebugToolsRealService,
        },
        provideMockStore(),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebugToolsRealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
