import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AccessToken, User, VerificationParams } from '@parkside-stack/api-interfaces';
import { MessageType } from '@psf-core/model/message';
import { setMessage } from '@psf-core/store/core.actions';
import { AppState } from '@psf/app.state';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { verify } from '../store/auth.actions';
import { selectAccessToken, selectUser, selectVerifyError } from '../store/auth.selectors';

@Component({
  templateUrl: './email-verification-response.component.html',
  styleUrls: ['./email-verification-response.component.scss'],
})
export class EmailVerificationResponseComponent implements OnInit {
  userEmail: string;
  code: string;
  private subscriptions: Subscription[] = [];
  isUserVerified: boolean = false;
  isUserLoggedIn: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private store$: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.handleVerificationToken();

    const userSubscription = this.store$.pipe(select(selectUser)).subscribe(
      (user: User): void => {
        if (user) {
          this.userEmail = user.email;
          this.isUserVerified = user.isEmailVerified;
        }
      }
    );

    const verifyErrorSubscription = this.store$.pipe(select(selectVerifyError)).subscribe((error: boolean) => {
      if (error) {
        this.store$.dispatch(setMessage({ text: 'Error during verification', messageType: MessageType.error }));
      }
    });

    const accessTokenSubscription = this.store$.pipe(select(selectAccessToken)).subscribe(
      (token: AccessToken) => {
        if (token) {
          this.isUserLoggedIn = true;
        }
      },
      () => {
        this.isUserLoggedIn = false;
      }
    );

    this.subscriptions.push(userSubscription, verifyErrorSubscription, accessTokenSubscription);
  }

  handleVerificationToken(): void {
    this.activatedRoute.params.subscribe(({ jwt }: Params) => {
      this.code = jwt;
      this.verifyUser(jwt);
    });
  }

  verifyUser(jwt: string = this.code): void {
    const verificationParams: VerificationParams = { jwt };
    this.store$.dispatch(verify({ verificationParams }));
  }
}
