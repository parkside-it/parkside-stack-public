import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  AccessToken,
  BackendPath,
  CreateUserDto,
  CreateUserParams,
  FrontendPath,
  LoginUserDto,
  User,
  VerificationParams,
} from '@parkside-stack/api-interfaces';
import { LocalStorageKeys } from '@psf-shared';
import { EnvironmentService } from '@psf/environment.service';
import { Observable } from 'rxjs';
import { AppState } from '../app.state';
import { loginError, loginSuccess, setUser, unsetUser } from './store/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private store$: Store<AppState>,
    private envService: EnvironmentService
  ) {
    const tokenString = this.getToken();

    if (tokenString) {
      const token: AccessToken = { accessToken: tokenString };
      this.me().subscribe(
        (user: User) => {
          this.store$.dispatch(loginSuccess({ accessToken: token }));
          this.store$.dispatch(setUser({ user }));
        },
        () => {
          this.store$.dispatch(loginError);
          this.store$.dispatch(unsetUser());
        }
      );
    } else {
      this.store$.dispatch(unsetUser());
    }
  }

  getToken(): string | null {
    return localStorage.getItem(LocalStorageKeys.UserToken);
  }

  me(): Observable<Object> {
    return this.http.get(`/${BackendPath.Api}/${BackendPath.Users}/${BackendPath.Me}`, {
      headers: { Authorization: 'Bearer ' + this.getToken() },
    });
  }

  logout(): void {
    this.store$.dispatch(unsetUser());
    this.router.navigate([`/${FrontendPath.Login}`]);
    localStorage.removeItem(LocalStorageKeys.UserToken);
  }

  login(loginUserDto: LoginUserDto): Observable<Object> {
    return this.http.post(`/${BackendPath.Api}/${BackendPath.Users}/${BackendPath.Login}`, loginUserDto);
  }

  register(createUserDto: CreateUserDto): Observable<Object> {
    const queryParams: CreateUserParams = { locale: this.envService.currentLocale };
    return this.http.post(`/${BackendPath.Api}/${BackendPath.Users}/${BackendPath.Register}`, createUserDto, {
      params: { locale: queryParams.locale },
    });
  }

  verifyUser(verificationParams: VerificationParams): Observable<Object> {
    return this.http.post(
      `/${BackendPath.Api}/${BackendPath.Users}/${BackendPath.Verification}/${verificationParams.jwt}`,
      {}
    );
  }
}
