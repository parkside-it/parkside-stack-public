import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AuthService, EmailVerificationResponseComponent } from '@psf-auth';
import { SharedModule } from '@psf-shared';
import { AppState } from '@psf/app.state';

describe('EmailVerificationResponseComponent', () => {
  let component: EmailVerificationResponseComponent;
  let fixture: ComponentFixture<EmailVerificationResponseComponent>;
  let store: MockStore<AppState>;
  const initialState = { auth: {}, core: {} };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmailVerificationResponseComponent],
      imports: [FormsModule, RouterTestingModule, HttpClientTestingModule, SharedModule],
      providers: [AuthService, provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.get(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailVerificationResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
