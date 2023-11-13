import { TestBed } from '@angular/core/testing';

import { PurchaseLotsUpdaterService } from './purchase-lots-updater.service';

describe('PurchaseLotsUpdaterService', () => {
  let service: PurchaseLotsUpdaterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchaseLotsUpdaterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
