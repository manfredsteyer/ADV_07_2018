import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router';
import { AppState, isInitializedSelector } from '../+state';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class InitGuard implements CanActivate {

    constructor(private store: Store<AppState>) {
    }

    canActivate(): Observable<boolean> {
        return this.store.select(isInitializedSelector).pipe(
            filter(init => !!init)
        );
    }
}
