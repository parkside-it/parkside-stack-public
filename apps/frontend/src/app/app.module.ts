import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthModule } from '@psf-auth';
import { CoreModule } from '@psf-core';
import { SharedModule } from '@psf-shared';
import { DebugToolsModule } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    RouterModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    CoreModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument(),
    SharedModule,
    AuthModule,
    DebugToolsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
