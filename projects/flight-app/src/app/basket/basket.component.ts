import { ServiceBus } from './../shared/service-bus.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Flight } from '@flight-workspace/flight-api';
import { Subject } from '../../../../../node_modules/rxjs';
import { takeUntil } from '../../../../../node_modules/rxjs/operators';

@Component({
  selector: 'basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit, OnDestroy {

  flights: Flight[] = [];

  closeSubject = new Subject();

  constructor(private serviceBus: ServiceBus) {
  }

  ngOnInit(): void {
    this.serviceBus.flightSelected
        .pipe(takeUntil(this.closeSubject))
        .subscribe(
      f => {
         if (!f) return;
         this.flights.push(f); 
        }
    );
  }

  ngOnDestroy(): void {
    this.closeSubject.next();
    this.closeSubject.complete();
  }


}
