import { TestBed } from '@angular/core/testing';

import { SuppliersService } from './suppliers.service';

describe('FornecedoresService', () => {
  let service: SuppliersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuppliersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
