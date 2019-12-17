import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Message } from '@psf-core/model/message';
import { unsetMessage } from '@psf-core/store/core.actions';
import { selectMessage } from '@psf-core/store/core.selectors';
import { AppState } from '@psf/app.state';

@Component({
  selector: 'ps-message-outlet',
  templateUrl: './message-outlet.component.html',
  styleUrls: ['./message-outlet.component.scss'],
})
export class MessageOutletComponent {
  message: Message | null;

  constructor(private store$: Store<AppState>) {
    this.store$.pipe(select(selectMessage)).subscribe((message: Message) => {
      this.message = message;
    });
  }

  messageClosed(): void {
    this.store$.dispatch(unsetMessage());
  }
}
