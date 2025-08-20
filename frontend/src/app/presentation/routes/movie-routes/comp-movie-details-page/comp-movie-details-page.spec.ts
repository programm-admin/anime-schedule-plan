import { ComponentFixture, TestBed } from '@angular/core/testing';

import { COMPMovieDetailsPage } from './comp-movie-details-page';

describe('COMPMovieDetailsPage', () => {
  let component: COMPMovieDetailsPage;
  let fixture: ComponentFixture<COMPMovieDetailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [COMPMovieDetailsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(COMPMovieDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
