import { Component, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { Flight, FlightService } from '@flight-workspace/flight-api';
import { FormControl } from '@angular/forms';
import { switchMap, debounceTime, tap, startWith, map, distinctUntilChanged, combineLatest, filter, share } from 'rxjs/operators';

@Component({
  selector: 'lookahaed',
  templateUrl: './lookahaed.component.html',
  styleUrls: ['./lookahaed.component.css']
})
export class LookahaedComponent implements OnInit {

  control: FormControl = new FormControl();

  value$: Observable<string> = this.control.valueChanges;
  flights$: Observable<Flight[]>
  loading: boolean = false;
  online$: Observable<boolean>;
  online: boolean;

  constructor(private flightService: FlightService) {
  }

  ngOnInit() {

    this.online$
      = interval(2000).pipe(
        startWith(0),
        map(_ => Math.random() < 0.5),
        distinctUntilChanged(),
        share() // HOT
        //tap(value => this.online = value)
      );

    this.flights$ = this.value$.pipe(
      debounceTime(300),
      combineLatest(this.online$),
      map(t => ({ value: t[0], online: t[1] })),
      filter(o => o.online),
      map(o => o.value),
      tap(_ => this.loading = true),
      switchMap(v => this.flightService.find(v, '')),
      tap(_ => this.loading = false)
    );
  }

}
