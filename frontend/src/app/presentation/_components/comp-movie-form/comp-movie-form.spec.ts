import { ComponentFixture, TestBed } from '@angular/core/testing';

import { COMPMovieForm } from './comp-movie-form';

describe('COMPMovieForm', () => {
    let component: COMPMovieForm;
    let fixture: ComponentFixture<COMPMovieForm>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [COMPMovieForm],
        }).compileComponents();

        fixture = TestBed.createComponent(COMPMovieForm);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
