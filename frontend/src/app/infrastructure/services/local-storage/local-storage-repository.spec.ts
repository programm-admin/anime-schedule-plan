import { TestBed } from '@angular/core/testing';

import { LocalStorageRepository } from './local-storage-repository';

describe('LocalStorageRepository', () => {
  let service: LocalStorageRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
