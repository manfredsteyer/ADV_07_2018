import { Action } from '@ngrx/store';
import { Flight } from '@flight-workspace/flight-api';

export enum FlightBookingActionTypes {
  FlightsLoaded = '[FlightBooking] FlightsLoaded',
  FlightsLoad = '[FlightBooking] FlightsLoad',
  FlightsLoadError = '[FlightBooking] FlightsLoadError',
  FlightUpdate = '[FlightBooking] FlightUpdate'
}

export class FlightsLoadedAction implements Action {
  readonly type = FlightBookingActionTypes.FlightsLoaded;
  constructor(readonly flights: Flight[]) {
  }
}

export class FlightsLoadAction implements Action {
  readonly type = FlightBookingActionTypes.FlightsLoad;
  constructor(readonly from: string, readonly to: string, readonly urgent: boolean) {
  }
}

export class FlightUpdateAction implements Action {
  readonly type = FlightBookingActionTypes.FlightUpdate;
  constructor(readonly flight: Flight) {
  }
}

export type FlightBookingActions = 
    FlightsLoadedAction | FlightsLoadAction | FlightUpdateAction; /*| FlightsUpdatedAction | ...Action*/
