import { getFlights, getFlightsWithBlacklist } from './../+state/flight-booking.reducer';
import { FlightsLoadedAction, FlightsLoadAction, FlightUpdateAction } from './../+state/flight-booking.actions';
import { Observable } from 'rxjs';
import {Component, OnInit} from '@angular/core';
import {FlightService, Flight} from '@flight-workspace/flight-api';
import { ServiceBus } from '../../shared/service-bus.service';
import { FlightBookingStateRef } from '../+state/flight-booking.reducer';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {

  from: string = 'Hamburg'; // in Germany
  to: string = 'Graz'; // in Austria
  urgent: boolean = false;

  get flights() {
    return this.flightService.flights;
  }

  // "shopping basket" with selected flights
  basket: object = {
    "3": true,
    "5": true
  };

  flights$: Observable<Flight[]>;

  constructor(
    private store: Store<FlightBookingStateRef>,
    private serviceBus: ServiceBus,
    private flightService: FlightService) {
  }

  ngOnInit() {
    this.flights$ = this.store.select(getFlightsWithBlacklist);
    //this.loading$ = this.store.select(getLoadingFlag);
  }

  search(): void {
    if (!this.from || !this.to) return;

    this.store.dispatch(new FlightsLoadAction(this.from, this.to, this.urgent));

  }

  delay(): void {
    this.store.select(s => s.flightBooking.flights).pipe(take(1)).subscribe(
      f => {
        const oldFlight = f[0];
        const oldDate = new Date(oldFlight.date);
        const newDate = new Date(oldDate.getTime() + 1000 * 60 * 15);
        
        const newFlight: Flight = {
          ...oldFlight,
          date: newDate.toISOString()
        };

        this.store.dispatch(new FlightUpdateAction(newFlight));
      }
    );
  }

  select(f: Flight, selected: boolean) {
    if (selected) {
      this.serviceBus.flightSelected.next(f);
    }
    this.basket[f.id] = selected;
  }

}
