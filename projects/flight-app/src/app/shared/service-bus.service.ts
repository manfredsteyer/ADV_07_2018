import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, ReplaySubject } from 'rxjs';
import { Flight } from '@flight-workspace/flight-api';

@Injectable({
  providedIn: 'root'
})
export class ServiceBus {

  flightSelected = new ReplaySubject<Flight>(3);

  constructor() { }

}

