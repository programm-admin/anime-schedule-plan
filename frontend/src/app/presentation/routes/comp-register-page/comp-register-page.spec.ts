import { ComponentFixture, TestBed } from '@angular/core/testing';

import { COMPRegisterPage } from './comp-register-page';

describe('COMPRegisterPage', () => {
    let component: COMPRegisterPage;
    let fixture: ComponentFixture<COMPRegisterPage>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [COMPRegisterPage],
        }).compileComponents();

        fixture = TestBed.createComponent(COMPRegisterPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
