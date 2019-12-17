import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebugToolsDummyComponent } from './debug-tools-dummy.component';

describe('DummyComponent', () => {
  let component: DebugToolsDummyComponent;
  let fixture: ComponentFixture<DebugToolsDummyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DebugToolsDummyComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebugToolsDummyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
