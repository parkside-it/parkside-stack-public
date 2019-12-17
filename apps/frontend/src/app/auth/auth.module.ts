import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@psf-shared';
import { EmailVerificationResponseComponent } from './email-verification/email-verification-response.component';
import { EmailVerificationSentComponent } from './email-verification/email-verification-sent.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthEffects } from './store/auth.effects';
import { authFeatureKey, authReducer } from './store/auth.reducers';

@NgModule({
  declarations: [
    ForgotPasswordComponent,
    RegisterComponent,
    LoginComponent,
    EmailVerificationSentComponent,
    EmailVerificationResponseComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule,
    EffectsModule.forRoot([AuthEffects]),
    StoreModule.forFeature(authFeatureKey, authReducer),
  ],
})
export class AuthModule {}
