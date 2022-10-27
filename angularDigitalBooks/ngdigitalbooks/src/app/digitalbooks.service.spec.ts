import { TestBed } from '@angular/core/testing';

import { DigitalBooksService } from './digitalbooks.service';

describe('DigitalBooksService', () => {
  let service: DigitalBooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DigitalBooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
