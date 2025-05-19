import { TestBed } from '@angular/core/testing';

import { AutorizationGuard } from './autorization.guard';

describe('AutorizationGuard', () => {
  let guard: AutorizationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AutorizationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
