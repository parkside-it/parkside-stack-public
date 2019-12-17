import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontendPath } from '@parkside-stack/api-interfaces';
import {
  AuthGuardService,
  EmailVerificationResponseComponent,
  EmailVerificationSentComponent,
  LoginComponent,
  RegisterComponent,
} from '@psf-auth';
import { AccountComponent } from './account/account.component';

const routes: Routes = [
  { path: FrontendPath.Account, component: AccountComponent, canActivate: [AuthGuardService] },
  { path: FrontendPath.Login, component: LoginComponent },
  { path: FrontendPath.Register, component: RegisterComponent, canActivate: [AuthGuardService] },
  { path: `${FrontendPath.Verify}/:jwt`, component: EmailVerificationResponseComponent },
  { path: FrontendPath.Verify, component: EmailVerificationSentComponent },
];

export const CoreRoutingModule: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
