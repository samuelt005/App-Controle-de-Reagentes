import { TestBed } from '@angular/core/testing';

import { MaterialTypesUpdaterService } from './material-types-updater.service';

describe('MaterialTypesUpdaterService', () => {
  let service: MaterialTypesUpdaterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialTypesUpdaterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
