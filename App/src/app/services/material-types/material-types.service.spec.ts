import { TestBed } from '@angular/core/testing';

import { MaterialTypesService } from './material-types.service';

describe('MaterialTypesService', () => {
  let service: MaterialTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
