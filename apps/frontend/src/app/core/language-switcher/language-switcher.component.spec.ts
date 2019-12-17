import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { LanguageSwitcherComponent } from '@psf-core';
import { EnvironmentService } from '@psf/environment.service';

describe('LanguageSwitcherComponent', () => {
  let component: LanguageSwitcherComponent;
  let fixture: ComponentFixture<LanguageSwitcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LanguageSwitcherComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: EnvironmentService,
          useValue: {
            get languages(): string[] {
              return ['en', 'de'];
            },
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return an array with locales', () => {
    expect(component.supportedLocales).toHaveLength(2);
  });
});
