import { TestBed } from '@angular/core/testing';

import { NfesUpdaterService } from './nfes-updater.service';

describe('NfesUpdaterService', () => {
  let service: NfesUpdaterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NfesUpdaterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
