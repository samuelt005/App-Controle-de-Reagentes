import { TestBed } from '@angular/core/testing';

import { RequestListingService } from './request-listing.service';

describe('RequestListingService', () => {
  let service: RequestListingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestListingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
