import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService, ForgotPasswordComponent } from '@psf-auth';
import { CoreModule, LandingComponent, PageNotFoundComponent } from '@psf-core';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [AuthGuardService] },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [CoreModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
