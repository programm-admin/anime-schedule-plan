import { TestBed } from '@angular/core/testing';

import { MovieRepository } from './movie-repository';

describe('MovieRepository', () => {
    let service: MovieRepository;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(MovieRepository);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
