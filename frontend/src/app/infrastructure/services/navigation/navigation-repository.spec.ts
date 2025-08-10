import { TestBed } from '@angular/core/testing';

import { NavigationRepository } from './navigation-repository';

describe('NavigationRepository', () => {
  let service: NavigationRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigationRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
