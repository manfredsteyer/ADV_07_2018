import { Action, createSelector } from '@ngrx/store';
import { FlightBookingActions, FlightBookingActionTypes } from './flight-booking.actions';
import { Flight } from '@flight-workspace/flight-api';

export const getFlights = 
        (s: FlightBookingStateRef) => s.flightBooking.flights;

export const getFlightsWithBlacklist =
        createSelector(
          (s: FlightBookingStateRef) => s.flightBooking.flights,
          (s: FlightBookingStateRef) => s.flightBooking.blackList,
          (flights, blackList) => flights.filter(f => blackList.indexOf(f.id) == -1)
        )



export interface FlightBookingStateRef {
  flightBooking: State
  
}

export interface State {
  flights: Flight[];
  blackList: number[];
  
}

export const initialState: State = {
  flights: [],
  blackList: [5]
};

export function reducer(state = initialState, action: FlightBookingActions): State {
  switch (action.type) {

    case FlightBookingActionTypes.FlightsLoaded:
      return { ...state, flights: action.flights }  

    case FlightBookingActionTypes.FlightUpdate:
      
      const newFlight = action.flight;
      const newFlights = state.flights.map(f => f.id === newFlight.id ? newFlight : f);
      return { ...state, flights: newFlights }  

    default:
      return state;
  }
}
