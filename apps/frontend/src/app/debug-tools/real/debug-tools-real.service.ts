import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BackendPath, FrontendPath } from '@parkside-stack/api-interfaces';
import { AuthService } from '@psf-auth';
import { MessageType } from '@psf-core/model/message';
import { setMessage } from '@psf-core/store/core.actions';
import { AppState } from '@psf/app.state';
import { DebugToolsService } from '@psf/debug-tools/debug-tools.service';

@Injectable()
export class DebugToolsRealService implements DebugToolsService {
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router,
    private store$: Store<AppState>
  ) {}

  deleteCurrentUser(): void {
    const token = this.authService.getToken();

    this.http
      .delete(`/${BackendPath.Api}/${BackendPath.Users}/${BackendPath.Me}`, {
        headers: { Authorization: 'Bearer ' + token },
      })
      .subscribe(
        () => {
          this.authService.logout();
          const successMessage = 'User successfully deleted. Redirecting to register page now...';
          this.store$.dispatch(setMessage({ text: successMessage, messageType: MessageType.success }));
          this.router.navigate([`/${FrontendPath.Register}`]);
        },
        (error: Response) => {
          const errorMessage = 'Error: Could not delete user.\nAPI Error: ' + error.statusText;
          this.store$.dispatch(setMessage({ text: errorMessage, messageType: MessageType.error }));
        }
      );
  }
}
