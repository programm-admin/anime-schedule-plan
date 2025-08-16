import { ComponentFixture, TestBed } from '@angular/core/testing';

import { COMPBase } from './comp-base';

describe('COMPBase', () => {
    let component: COMPBase;
    let fixture: ComponentFixture<COMPBase>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [COMPBase],
        }).compileComponents();

        fixture = TestBed.createComponent(COMPBase);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
