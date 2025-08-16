import { ComponentFixture, TestBed } from '@angular/core/testing';

import { COMPMovieStartPage } from './comp-movie-start-page';

describe('COMPMovieStartPage', () => {
    let component: COMPMovieStartPage;
    let fixture: ComponentFixture<COMPMovieStartPage>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [COMPMovieStartPage],
        }).compileComponents();

        fixture = TestBed.createComponent(COMPMovieStartPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
