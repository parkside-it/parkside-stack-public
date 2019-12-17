import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { AuthGuardService, AuthService } from '@psf-auth';
import { AccountComponent } from './account/account.component';
import { CoreRoutingModule } from './core-routing.module';
import { LandingComponent } from './landing/landing.component';
import { LanguageSwitcherComponent } from './language-switcher/language-switcher.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { coreFeatureKey, coreReducer } from './store/core.reducers';

@NgModule({
  declarations: [AccountComponent, LandingComponent, NavbarComponent, PageNotFoundComponent, LanguageSwitcherComponent],
  exports: [NavbarComponent],
  imports: [
    RouterModule,
    CoreRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forFeature(coreFeatureKey, coreReducer),
  ],
  providers: [AuthService, AuthGuardService],
})
export class CoreModule {}
