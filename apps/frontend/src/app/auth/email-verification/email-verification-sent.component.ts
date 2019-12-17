import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '@psf/app.state';
import { Observable } from 'rxjs';
import { selectUserName } from '../store/auth.selectors';

@Component({
  templateUrl: './email-verification-sent.component.html',
  styleUrls: ['./email-verification-sent.component.scss'],
})
export class EmailVerificationSentComponent implements OnInit {
  userName$: Observable<string>;

  constructor(private store$: Store<AppState>) {
    this.userName$ = this.store$.pipe(select(selectUserName));
  }

  ngOnInit(): void {}
}
