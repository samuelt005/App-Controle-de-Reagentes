import { TestBed } from '@angular/core/testing';

import { SuppliersUpdaterService } from './suppliers-updater.service';

describe('SuppliersUpdaterService', () => {
  let service: SuppliersUpdaterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuppliersUpdaterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
