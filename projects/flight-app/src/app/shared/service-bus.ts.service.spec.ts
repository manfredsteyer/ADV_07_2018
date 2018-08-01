/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ServiceBus.tsService } from './service-bus.ts.service';

describe('Service: ServiceBus.ts', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceBus.tsService]
    });
  });

  it('should ...', inject([ServiceBus.tsService], (service: ServiceBus.tsService) => {
    expect(service).toBeTruthy();
  }));
});
