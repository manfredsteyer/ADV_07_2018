import { initState } from './+state/index';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlightCancellingModule } from './flight-booking/flight-cancelling/flight-cancelling.module';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import { FlightApiModule, FlightService } from '@flight-workspace/flight-api';

import {AppComponent} from './app.component';
import {APP_EXTRA_OPTIONS, APP_ROUTES} from './app.routes';
import {BasketComponent} from './basket/basket.component';
import {FlightBookingModule} from './flight-booking/flight-booking.module';
import {HomeComponent} from './home/home.component';
import {NavbarComponent} from './navbar/navbar.component';
import {SharedModule} from './shared/shared.module';
import {SidebarComponent} from './sidebar/sidebar.component';

import {  AuthInterceptor } from './shared/auth/auth.interceptor';
import { LookahaedComponent } from './lookahaed/lookahaed.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './+state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';

import { OAuthModule } from 'angular-oauth2-oidc';
import { FLIGHT_SERVICES } from './app.tokens';

@NgModule({
   imports: [
      FormsModule,
      ReactiveFormsModule,
      BrowserModule,
      HttpClientModule,
      
      OAuthModule.forRoot(),
      // FlightBookingModule,

      FlightCancellingModule,
      FlightApiModule.forRoot(),
      SharedModule.forRoot(),
      RouterModule.forRoot([...APP_ROUTES], {...APP_EXTRA_OPTIONS}),
      
      StoreModule.forRoot(reducers, { initialState: initState, metaReducers }),
      
      !environment.production ? StoreDevtoolsModule.instrument() : [],
      EffectsModule.forRoot([]),
      
      ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  declarations: [
    LookahaedComponent,
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    HomeComponent,
    BasketComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    { 
      provide: FLIGHT_SERVICES,
      useClass: FlightService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

