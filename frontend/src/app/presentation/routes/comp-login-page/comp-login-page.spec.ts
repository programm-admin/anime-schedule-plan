import { ComponentFixture, TestBed } from '@angular/core/testing';

import { COMPLoginPage } from './comp-login-page';

describe('COMPLoginPage', () => {
    let component: COMPLoginPage;
    let fixture: ComponentFixture<COMPLoginPage>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [COMPLoginPage],
        }).compileComponents();

        fixture = TestBed.createComponent(COMPLoginPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
