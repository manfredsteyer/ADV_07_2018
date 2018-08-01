import { InjectionToken } from "@angular/core";
import { FlightService } from "@flight-workspace/flight-api";

export const FLIGHT_SERVICES = new InjectionToken<FlightService>('FLIGHT_SERVICES');

