import { TestBed } from '@angular/core/testing';

import { BuildPcDataSharedService } from './build-pc-data-shared.service';

describe('BuildPcDataSharedService', () => {
  let service: BuildPcDataSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuildPcDataSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
