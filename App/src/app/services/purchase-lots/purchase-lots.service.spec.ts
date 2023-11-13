import { TestBed } from '@angular/core/testing';

import { PurchaseLotsService } from './purchase-lots.service';

describe('LotsService', () => {
  let service: PurchaseLotsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchaseLotsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
