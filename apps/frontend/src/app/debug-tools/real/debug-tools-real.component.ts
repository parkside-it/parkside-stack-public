import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AccessTokenResponse } from '@parkside-stack/api-interfaces';
import { selectAccessToken } from '@psf-auth';
import { AppState } from '@psf/app.state';
import { DebugToolsService } from '@psf/debug-tools/debug-tools.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ps-debug-tools',
  templateUrl: './debug-tools-real.component.html',
  styleUrls: ['./debug-tools-real.component.scss'],
})
export class DebugToolsRealComponent implements OnInit, OnDestroy {
  collapsed: boolean = true;
  debugToolsEnabled: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(private debugTools: DebugToolsService, private store$: Store<AppState>) {}

  ngOnInit(): void {
    const accessTokenSubscription = this.store$
      .pipe(select(selectAccessToken))
      .subscribe((token: AccessTokenResponse) => {
        this.debugToolsEnabled = !!token;
      });

    this.subscriptions.push(accessTokenSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  deleteCurrentUser(): void {
    this.debugTools.deleteCurrentUser();
    this.collapsed = true;
  }

  collapseToolWindow(): void {
    this.collapsed = !this.collapsed;
  }
}
