import {ExtraOptions, Routes, PreloadAllModules} from '@angular/router';
import {BasketComponent} from './basket/basket.component';
import {HomeComponent} from './home/home.component';
import { InitGuard } from './shared/init.guard';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'flight-booking',
    canActivate: [InitGuard],
    loadChildren: './flight-booking/flight-booking.module#FlightBookingModule'
  },
  {
    path: 'basket',
    component: BasketComponent,
    outlet: 'aux'
  },
  {
    path: '**',
    redirectTo: 'home'
  }
]

export const APP_EXTRA_OPTIONS: ExtraOptions = {
  preloadingStrategy: PreloadAllModules,
  // useHash: true
}
