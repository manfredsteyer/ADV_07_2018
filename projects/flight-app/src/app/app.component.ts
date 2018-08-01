import { FlightService } from '@flight-workspace/flight-api';
import {Component, Inject} from '@angular/core';
//import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { AppState, AppInitAction } from './+state';
import { Store } from '@ngrx/store';
import { FLIGHT_SERVICES } from './app.tokens';

@Component({
  selector: 'flight-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(

    @Inject(FLIGHT_SERVICES) private flightServices: FlightService[],

    private store: Store<AppState>, 
    private oauthService: OAuthService) { 

    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    this.oauthService.events.subscribe(e => console.debug(e));

    // setTimeout(() => {
    //   this.store.dispatch(new AppInitAction());
    // }, 7000);

  }

}

