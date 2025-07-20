import { ComponentFixture, TestBed } from '@angular/core/testing';

import { COMPUserStartPage } from './comp-user-start-page';

describe('COMPUserStartPage', () => {
  let component: COMPUserStartPage;
  let fixture: ComponentFixture<COMPUserStartPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [COMPUserStartPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(COMPUserStartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
