import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { IconComponent } from '@psf-shared/icon/icon.component';
import { MessageComponent } from '../message/message.component';
import { MessageOutletComponent } from './message-outlet.component';

describe('MessageOutletComponent', () => {
  let component: MessageOutletComponent;
  let fixture: ComponentFixture<MessageOutletComponent>;
  const initialState = { core: {} };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MessageOutletComponent, MessageComponent, IconComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
