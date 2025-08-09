import { ComponentFixture, TestBed } from '@angular/core/testing';

import { COMPCreateMoviePage } from './comp-create-movie-page';

describe('COMPCreateMoviePage', () => {
  let component: COMPCreateMoviePage;
  let fixture: ComponentFixture<COMPCreateMoviePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [COMPCreateMoviePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(COMPCreateMoviePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
