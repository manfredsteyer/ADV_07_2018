import { Observable, Observer } from 'rxjs';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { ExitComponent } from '../../shared/exit/exit.guard';

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html'
})
export class FlightEditComponent implements OnInit, ExitComponent {
  id: string;
  showDetails: string;
  showWarning = false;
  sender: Observer<boolean>;

  constructor(private route: ActivatedRoute) {
  }

  decide(decision: boolean): void {
    this.sender.next(decision);
    this.sender.complete();
    this.showWarning = false;
  }

  canExit(): Observable<boolean> {
    this.showWarning = true;
    return Observable.create((observer: Observer<boolean>) => {
      this.sender = observer;
    });
  }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.id = p['id'];
      this.showDetails = p['showDetails'];
    });
  }

  delete(): void {
    console.debug('delete is not implemented yet!');
  }

}
