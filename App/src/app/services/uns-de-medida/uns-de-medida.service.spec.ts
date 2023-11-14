import { TestBed } from '@angular/core/testing';

import { UnsDeMedidaService } from './uns-de-medida.service';

describe('UnsDeMedidaService', () => {
  let service: UnsDeMedidaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnsDeMedidaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
