import { TestBed } from '@angular/core/testing';

import { InfoCardsService } from './info-cards.service';

describe('InfoCardsService', () => {
  let service: InfoCardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoCardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
