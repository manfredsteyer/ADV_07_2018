import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanDeactivate } from "@angular/router";
import { FlightEditComponent } from "../../flight-booking/flight-edit/flight-edit.component";

export interface ExitComponent {
    canExit(): Observable<boolean>;
}

@Injectable({
    providedIn: 'root'
})
export class ExitGuard implements CanDeactivate<ExitComponent> {


    canDeactivate(component: ExitComponent): Observable<boolean> {
        return component.canExit();
    }

}