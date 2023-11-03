import { TestBed } from '@angular/core/testing';

import { TiposDeReagenteService } from './tipos-de-reagente.service';

describe('TiposDeReagenteService', () => {
  let service: TiposDeReagenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiposDeReagenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
