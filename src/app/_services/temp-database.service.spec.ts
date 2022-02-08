import { TestBed } from '@angular/core/testing';

import { TempDatabaseService } from './temp-database.service';

describe('TempDatabaseService', () => {
  let service: TempDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TempDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
