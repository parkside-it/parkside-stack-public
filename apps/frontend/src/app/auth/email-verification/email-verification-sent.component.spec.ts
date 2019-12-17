import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { EmailVerificationSentComponent } from '@psf-auth';
import { SharedModule } from '@psf-shared';

describe('EmailVerificationSentComponent', () => {
  let component: EmailVerificationSentComponent;
  let fixture: ComponentFixture<EmailVerificationSentComponent>;
  let store: MockStore<{ user: null }>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmailVerificationSentComponent],
      imports: [RouterTestingModule, SharedModule],
      providers: [provideMockStore({})],
    }).compileComponents();

    store = TestBed.get(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailVerificationSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
