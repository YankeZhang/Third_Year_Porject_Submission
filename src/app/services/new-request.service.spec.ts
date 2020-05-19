import { TestBed } from '@angular/core/testing';

import { NewRequestService } from './new-request.service';

describe('NewRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewRequestService = TestBed.get(NewRequestService);
    expect(service).toBeTruthy();
  });
});
